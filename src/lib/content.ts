export interface ContentMeta {
  title: string;
  date: string;
  tags: string[];
  languages?: string[];
  author?: string;
  description?: string;
  slug: string;
  href: string;
  type: 'blog' | 'task';
  component: any;
  /** External link posts have no component — they link offsite */
  externalUrl?: string;
  /** Minor posts render as a simple one-line link */
  minor?: boolean;
  /** Overrides the domain label shown beside a minor link */
  sourceLabel?: string;
  /** Article sits behind a paywall — shows a "Subscription" pill on minor links */
  paywalled?: boolean;
  /** Draft posts are accessible by slug but hidden from listings, feeds, and sitemap */
  draft?: boolean;
}

import { blogLinks } from './blog-links';

/** Tags that mark a post as "news" — these are shown on /news instead of /blog. */
export const NEWS_TAGS = ['news', 'press'];

/** True if any of the post's tags marks it as news/press. */
export function hasNewsTag(tags: string[]): boolean {
  return tags.some((t) => NEWS_TAGS.includes(t));
}

const blogModules = import.meta.glob('../../content/blog/*.svx', { eager: true }) as Record<string, any>;
const taskModules = import.meta.glob('../../content/tasks/*.svx', { eager: true }) as Record<string, any>;

function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? '';
  return filename.replace(/\.svx$/, '');
}

function loadModules(modules: Record<string, any>, type: 'blog' | 'task'): ContentMeta[] {
  return Object.entries(modules).map(([path, mod]) => {
    const meta = mod.metadata ?? {};
    const slug = extractSlug(path);
    const tags: string[] = meta.tags ?? [];
    const href = type === 'blog'
      ? (hasNewsTag(tags) ? `/news/${slug}` : `/blog/${slug}`)
      : `/tasks/${tags[0] ?? 'uncategorized'}/${slug}`;
    return {
      title: meta.title ?? slug,
      date: meta.date ?? '1970-01-01',
      tags,
      languages: meta.languages,
      author: meta.author,
      description: meta.description,
      slug,
      href,
      type,
      component: mod.default,
      draft: meta.draft === true || meta.draft === 'true',
    };
  });
}

let _allContent: ContentMeta[] | null = null;

function loadBlogLinks(): ContentMeta[] {
  return blogLinks.map((link) => ({
    title: link.title,
    date: link.date,
    tags: link.tags,
    author: link.author,
    description: link.description,
    slug: link.id,
    href: link.url,
    type: 'blog' as const,
    component: null,
    externalUrl: link.url,
    minor: link.minor,
    sourceLabel: link.sourceLabel,
    paywalled: link.paywalled,
  }));
}

export function getAllContent(): ContentMeta[] {
  if (!_allContent) {
    const blogs = loadModules(blogModules, 'blog');
    const links = loadBlogLinks();
    const tasks = loadModules(taskModules, 'task');
    _allContent = [...blogs, ...links, ...tasks].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  return _allContent;
}

export function getBlogPosts(): ContentMeta[] {
  return getAllContent().filter(
    (c) => c.type === 'blog' && !c.draft && !hasNewsTag(c.tags)
  );
}

export function getNewsPosts(): ContentMeta[] {
  return getAllContent().filter(
    (c) => c.type === 'blog' && !c.draft && hasNewsTag(c.tags)
  );
}

export function getTaskExamples(): ContentMeta[] {
  return getAllContent().filter((c) => c.type === 'task');
}

export function getContentByTag(tag: string): ContentMeta[] {
  return getAllContent().filter((c) => c.tags.includes(tag) && !c.draft);
}

export function getContentBySlug(slug: string): ContentMeta | undefined {
  return getAllContent().find((c) => c.slug === slug);
}

import type { Plugin, ResolvedConfig } from 'vite';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { compile } from 'mdsvex';

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c]!);
const escapeMarkdown = (s: string) => s.replace(/([\\`*_[\]<>])/g, '\\$1');

interface Post {
  slug: string;
  section: 'blog' | 'news';
  title: string;
  description: string;
  date: string;
  author: string;
  body: string;
}

/** Keep code examples verbatim while removing the site's Svelte-only markup. */
export function markdownBody(source: string, canonical: string): string {
  const code: string[] = [];
  let body = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '');
  body = body.replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1[ \t]*$/gm,
    block => `\u0000CODE${code.push(block) - 1}\u0000`);
  body = body.replace(/(`+)[^`\n]*?\1/g,
    block => `\u0000CODE${code.push(block) - 1}\u0000`);
  body = body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');

  function attrs(tag: string): Record<string, string> {
    return Object.fromEntries([...tag.matchAll(/([\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
      .map(m => [m[1], m[2] ?? m[3]]));
  }
  const image = (src: string, alt: string) => `![${escapeMarkdown(alt)}](<${new URL(src, canonical).href}>)`;
  body = body.replace(/<(ImageZoom|ImageCompare)\b[^>]*\/>/g, tag => {
    const a = attrs(tag);
    if (tag.startsWith('<ImageZoom') && a.src) return image(a.src, a.alt ?? '');
    if (a.leftSrc && a.rightSrc) return ['left', 'right'].map(side =>
      image(a[`${side}Src`], [a.alt, a[`${side}Label`] ?? side].filter(Boolean).join(' — '))
    ).join('\n\n');
    throw new Error(`Unsupported image component in ${canonical}: ${tag}`);
  });
  body = body.replace(/<CropUmap\s*\/>/g,
    `[Interactive crop embedding visualisation (requires JavaScript)](${canonical})`);
  // Fail rather than silently publish incomplete exports when new components appear.
  if (/<[A-Z][\w.]*(?:\s|\/?>)/.test(body)) {
    throw new Error(`Add a Markdown fallback for the new Svelte component in ${canonical}`);
  }
  // Markdown allows ordinary HTML: preserve figures, captions, tables and video links.
  // Resolve links so /news posts still find images stored under /blog.
  body = body.replace(/\b(src|href|poster)=("|')([^"']+)\2/g,
    (_, attr, quote, url) => `${attr}=${quote}${new URL(url, canonical).href}${quote}`);
  body = body.replace(/\]\((\/[^\s)]*)\)/g,
    (_, url) => `](${new URL(url, canonical).href})`);
  body = body.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => code[Number(i)]);
  return body.trim() + '\n';
}

export async function collectPosts(blogDir: string): Promise<Post[]> {
  const posts: Post[] = [];
  for (const file of readdirSync(blogDir).filter(f => f.endsWith('.svx')).sort()) {
    const source = readFileSync(join(blogDir, file), 'utf8');
    // Use the same YAML parser as the site's MDsveX content pipeline.
    const frontmatter = source.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0];
    if (!frontmatter) throw new Error(`Missing frontmatter in ${file}`);
    const result = await compile(frontmatter, { highlight: false });
    const meta = result?.data?.fm as Record<string, any> | undefined;
    if (!meta) throw new Error(`Missing metadata in ${file}`);
    if (meta.draft === true || meta.draft === 'true') continue;
    posts.push({
      slug: file.slice(0, -4),
      section: (meta.tags ?? []).some((t: string) => ['news', 'press'].includes(t)) ? 'news' : 'blog',
      title: meta.title ?? file.slice(0, -4),
      description: meta.description ?? '',
      date: meta.date instanceof Date ? meta.date.toISOString().slice(0, 10) : String(meta.date ?? ''),
      author: meta.author ?? 'TESSERA Team',
      body: source,
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Minimal HTML discovery pages; the browser replaces their body with the SPA. */
export function agentPage(shell: string, title: string, description: string, canonical: string,
  body: string, markdownUrl?: string): string {
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(title)} — TESSERA</title>`);
  const values: Record<string, string> = {
    description, 'og:title': title, 'twitter:title': title,
    'og:description': description, 'twitter:description': description,
    'og:url': canonical, 'og:type': markdownUrl ? 'article' : 'website',
  };
  html = html.replace(/<meta (name|property)="([^"]+)" content="[^"]*"\s*\/>/g,
    (tag, attr, key) => key in values ? `<meta ${attr}="${key}" content="${escapeHtml(values[key])}" />` : tag);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/,
    () => `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
  if (markdownUrl) html = html.replace('</head>',
    () => `<link rel="alternate" type="text/markdown" href="${escapeHtml(markdownUrl)}" />\n</head>`);
  return html.replace(/<div id="app">[\s\S]*?<\/div>/,
    () => `<div id="app"><main style="max-width:48rem;margin:3rem auto;padding:1rem;line-height:1.7">${body}</main></div>`);
}

export function agentsPlugin(opts: { siteUrl: string; blogDir: string }): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'agents',
    apply: 'build',
    configResolved(resolved) { config = resolved; },
    // Run after SPA route copies have been written, including 404.html.
    writeBundle: {
      sequential: true,
      async handler() {
        const dist = resolve(config.root, config.build.outDir);
        const shell = readFileSync(join(dist, 'index.html'), 'utf8');
        const base = new URL(config.base, opts.siteUrl).href;
        const url = (p: string) => new URL(p, base).href;
        const write = (file: string, content: string) => {
          const dest = join(dist, file);
          mkdirSync(dirname(dest), { recursive: true });
          writeFileSync(dest, content);
        };
        const posts = await collectPosts(opts.blogDir);
        const discovery = `<p>For machine-readable content, fetch <a href="${escapeHtml(url('llms.txt'))}">llms.txt</a>. Published blog and news articles have Markdown equivalents: remove any trailing slash from the article URL, then append <code>.md</code>.</p>`;
        const lists: Record<string, string[]> = { blog: [], news: [] };
        const htmlLists: Record<string, string[]> = { blog: [], news: [] };
        for (const post of posts) {
          const route = `${post.section}/${post.slug}`;
          const canonical = url(route);
          const markdownUrl = url(`${route}.md`);
          write(`${route}.md`, `# ${escapeMarkdown(post.title)}\n\nDate: ${post.date}\nAuthor: ${escapeMarkdown(post.author)}\nCanonical URL: ${canonical}\n\n${markdownBody(post.body, canonical)}`);
          const body = `<h1>${escapeHtml(post.title)}</h1><p>${escapeHtml(post.date)} · ${escapeHtml(post.author)}</p><p>${escapeHtml(post.description)}</p><p><a href="${escapeHtml(markdownUrl)}">Read the full article as Markdown</a>. Enable JavaScript for the interactive page.</p>${discovery}`;
          const html = agentPage(shell, post.title, post.description, canonical, body, markdownUrl);
          write(`${route}/index.html`, html);
          // Preserve old /blog links for articles moved to /news, without a 404.
          if (post.section === 'news') {
            write(`blog/${post.slug}/index.html`, html);
            write(`blog/${post.slug}.md`, readFileSync(join(dist, `${route}.md`), 'utf8'));
          }
          lists[post.section].push(`- [${escapeMarkdown(post.title)}](${markdownUrl}): ${post.description.replace(/\s+/g, ' ')}`);
          htmlLists[post.section].push(`<li><a href="${escapeHtml(markdownUrl)}">${escapeHtml(post.title)}</a> — ${escapeHtml(post.date)}</li>`);
        }
        for (const section of ['blog', 'news']) {
          const title = section === 'blog' ? 'Blog' : 'News';
          write(`${section}/index.html`, agentPage(shell, title, `Original TESSERA ${section} articles`, url(section),
            `<h1>TESSERA ${title}</h1>${discovery}<h2>Original articles</h2><ul>${htmlLists[section].join('\n')}</ul>`));
        }
        write('llms.txt', `# TESSERA\n\n> A geospatial foundation model providing satellite-derived embeddings for Earth observation.\n\nThis index links to full Markdown versions of published articles hosted on this site. External coverage is not reproduced. Interactive visualisations require JavaScript; their surrounding text and image descriptions are included in Markdown.\n\n## Blog\n\n${lists.blog.join('\n')}\n\n## News\n\n${lists.news.join('\n')}\n`);
        write('404.html', agentPage(shell, 'Page not found', 'Find machine-readable TESSERA content', url('404.html'),
          `<h1>Page not found, or JavaScript is required</h1><p>This site uses JavaScript for interactive navigation.</p>${discovery}<p>If no Markdown equivalent exists, use the index to find a published article.</p>`));
      },
    },
  };
}

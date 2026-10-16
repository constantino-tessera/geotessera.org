import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync, rmSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { build } from 'vite';
import { agentsPlugin, collectPosts, markdownBody } from '../vite-plugin-agents.ts';

test('Markdown preserves examples and captions, and replaces interactive components', () => {
  const example = '```html\n<script>example()</script>\n<ImageZoom src="example.png" />\n```';
  const result = markdownBody(`---\ntitle: Example\n---\n<script>import Widget from './widget';</script>
<style>p { color: red; }</style>
${example}
Inline: \`<CropUmap />\`
<figure><ImageZoom src="/blog/photo.png" alt="A field" /><figcaption>Credit: team</figcaption></figure>
<ImageCompare leftSrc="/left.png" rightSrc="/right.png" leftLabel="Before" rightLabel="After" />
<CropUmap />
[Coverage](/coverage)
`, 'https://geotessera.org/news/example');
  assert.ok(result.includes(example));
  assert.ok(result.includes('`<CropUmap />`'));
  assert.ok(result.includes('![A field](<https://geotessera.org/blog/photo.png>)'));
  assert.ok(result.includes('Credit: team'));
  assert.ok(result.includes('![Before](<https://geotessera.org/left.png>)'));
  assert.ok(result.includes('![After](<https://geotessera.org/right.png>)'));
  assert.ok(result.includes('[Interactive crop embedding visualisation (requires JavaScript)](https://geotessera.org/news/example)'));
  assert.ok(result.includes('[Coverage](https://geotessera.org/coverage)'));
  assert.ok(!result.includes('import Widget'));
  assert.ok(!result.includes('color: red'));
  assert.throws(() => markdownBody('<NewWidget />', 'https://geotessera.org/blog/example'), /fallback/);
});

for (const base of ['/', '/preview/']) {
  test(`build emits discoverable pages and excludes drafts (base ${base})`, async () => {
    const root = realpathSync(mkdtempSync(join(tmpdir(), 'tessera-agents-')));
    try {
      const blogDir = join(root, 'content');
      mkdirSync(blogDir);
      const post = (tags: string, extra = '') => `---
title: 'A "quoted" title & <example>'
date: 2026-10-05
author: Team
description: |
  A multiline summary
  with & and <markup>.
tags: [${tags}]
${extra}---

This is the full article, with **Markdown**.
`;
      writeFileSync(join(blogDir, 'article.svx'), post('release'));
      writeFileSync(join(blogDir, 'press.svx'), post('press'));
      writeFileSync(join(blogDir, 'draft.svx'), post('news', 'draft: true\n'));
      writeFileSync(join(blogDir, 'draft-string.svx'), post('release', 'draft: "true"\n'));
      writeFileSync(join(root, 'index.html'), `<!doctype html><html><head>
<title>Home</title><meta name="description" content="Home" />
<meta property="og:title" content="Home" /><meta property="og:url" content="https://geotessera.org" />
<link rel="canonical" href="https://geotessera.org" />
<link rel="describedby" href="%BASE_URL%llms.txt" /></head><body><div id="app"></div></body></html>`);
      await build({ root, base, configFile: false, logLevel: 'silent',
        plugins: [agentsPlugin({ siteUrl: 'https://geotessera.org', blogDir })] });
      const read = (file: string) => readFileSync(join(root, 'dist', file), 'utf8');
      const origin = `https://geotessera.org${base}`;
      assert.match(read('blog/article.md'), /Date: 2026-10-05\n/);
      assert.ok(read('blog/article.md').includes('This is the full article, with **Markdown**.'));
      assert.ok(read('llms.txt').includes(`${origin}news/press.md`));
      assert.ok(!read('llms.txt').includes('draft'));
      for (const route of ['blog/draft-string', 'news/draft']) {
        assert.equal(existsSync(join(root, 'dist', `${route}.md`)), false);
        assert.equal(existsSync(join(root, 'dist', route, 'index.html')), false);
      }
      const html = read('news/press/index.html');
      assert.ok(html.includes(`rel="alternate" type="text/markdown" href="${origin}news/press.md"`));
      assert.ok(html.includes(`rel="canonical" href="${origin}news/press"`));
      assert.ok(html.includes('A &quot;quoted&quot; title &amp; &lt;example&gt;'));
      assert.ok(html.includes(`rel="describedby" href="${base}llms.txt"`));
      assert.ok(html.includes(`href="${origin}news/press.md">Read the full article`));
      assert.equal(read('blog/press/index.html'), html);
      assert.equal(read('blog/press.md'), read('news/press.md'));
      assert.ok(read('news/index.html').includes(`${origin}news/press.md`));
      assert.ok(read('404.html').includes(`${origin}llms.txt`));
      assert.ok(read('404.html').includes('remove any trailing slash'));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}

test('all repository posts export without leaking Svelte scripts or styles', async () => {
  const posts = await collectPosts(resolve('content/blog'));
  assert.ok(posts.length > 0);
  for (const post of posts) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    const body = markdownBody(post.body, `https://geotessera.org/${post.section}/${post.slug}`);
    assert.ok(body.length > 100, post.slug);
    assert.doesNotMatch(body, /<script\b|<style\b|<ImageZoom\b|<ImageCompare\b|<CropUmap\b/);
  }
});

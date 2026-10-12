// Opt-in HTML copies keep articles readable by crawlers without JavaScript.
// The Markdown remains the source used by the blog's existing client renderer.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

const origin = 'https://www.bitladssoftware.com';
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
for (const file of await readdir('content/blog')) {
  if (!file.endsWith('.md')) continue;
  const source = await readFile(`content/blog/${file}`, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match || !/^static: true$/m.test(match[1])) continue;
  // Same scalar frontmatter format as useBlogPosts; nested YAML is not supported.
  const meta = Object.fromEntries(match[1].split('\n').filter(line => line.includes(':')).map(line => {
    const colon = line.indexOf(':');
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  }));
  for (const key of ['title', 'description', 'author', 'date']) {
    if (!meta[key]) throw new Error(`${file}: missing ${key}`);
  }
  if (Number.isNaN(Date.parse(meta.date))) throw new Error(`${file}: invalid date`);
  const slug = file.replace(/\.md$/, '');
  const url = `${origin}/blog/${slug}`;
  const image = new URL(meta.image || '/stare-preview.webp', origin).href;
  const date = new Date(meta.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Bucharest' });
  const article = renderToStaticMarkup(createElement(ReactMarkdown, null, match[2].trim()));
  const schema = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: meta.title, description: meta.description, datePublished: meta.date,
    author: { '@type': 'Organization', name: meta.author, url: origin },
    publisher: { '@type': 'Organization', name: 'Bitlads Software', url: origin },
    mainEntityOfPage: url, url, image, inLanguage: 'en'
  }).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(meta.title)} | Bitlads Software</title>
<meta name="description" content="${escape(meta.description)}">
<meta name="author" content="${escape(meta.author)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article"><meta property="og:site_name" content="Bitlads Software">
<meta property="og:title" content="${escape(meta.title)}"><meta property="og:description" content="${escape(meta.description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${escape(image)}">
<meta property="article:published_time" content="${escape(meta.date)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(meta.title)}">
<meta name="twitter:description" content="${escape(meta.description)}"><meta name="twitter:image" content="${escape(image)}">
<script type="application/ld+json">${schema}</script>
<style>
:root{color-scheme:light;font-family:Inter,system-ui,sans-serif;color:#242420;background:#f5f3ed}*{box-sizing:border-box}body{margin:0}a{color:inherit;text-underline-offset:.2em}a:hover{color:#615314}a:focus-visible{outline:3px solid #75610a;outline-offset:5px}nav{max-width:1160px;margin:auto;padding:28px 24px;display:flex;justify-content:space-between;gap:24px;border-bottom:1px solid #d8d5ca}nav a:first-child{font-weight:750;text-decoration:none}main{max-width:780px;margin:64px auto 88px;padding:0 24px}h1{font-size:clamp(2.2rem,6vw,3.6rem);line-height:1.08;letter-spacing:-.045em;margin:20px 0 24px}h2{font-size:1.6rem;line-height:1.3;letter-spacing:-.025em;margin:48px 0 18px}.description{font-size:1.2rem;color:#56564c}.byline{font-size:.9rem;color:#626257;margin:24px 0 40px}p,li{font-size:1.08rem;line-height:1.8}li{margin:12px 0}ul{padding-left:24px}article a{text-decoration-color:#9a812b}footer{max-width:1160px;margin:auto;border-top:1px solid #d8d5ca;padding:28px 24px;font-size:.9rem}article{overflow-wrap:anywhere}@media(max-width:480px){main{margin-top:40px}p,li{font-size:1rem}h2{font-size:1.4rem}}
</style></head><body>
<nav aria-label="Main navigation"><a href="/">Bitlads Software</a><a href="/blog">All articles</a></nav>
<main><header><h1>${escape(meta.title)}</h1><p class="description">${escape(meta.description)}</p><p class="byline">${escape(meta.author)} · <time datetime="${escape(meta.date)}">${date}</time></p></header><article>${article}</article></main>
<footer><a href="/">Bitlads Software</a> · <a href="https://stare.bitladssoftware.com/">STARE for iPhone</a></footer>
</body></html>`;
  const dir = `dist/blog/${slug}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
  console.log(`Rendered ${url}`);
}

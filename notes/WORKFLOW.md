# WORKFLOW.md
## Day-to-day website management for geotessera.org
*(These notes composed by AI)*

This covers the routine tasks you'll do regularly as site maintainer. It assumes setup is already complete (see SETUP.md).

---

## Starting a work session

1. Open **PowerShell**
2. Navigate to the project folder:
   ```
   cd C:\Users\frisk\geotessera.org
   ```
3. Start the local development server:
   ```
   pnpm dev
   ```
4. Open **http://localhost:5173/** in your browser — this is your live preview
5. Open the project folder in **VS Code**: File → Open Folder → select `geotessera.org`

You're ready to work. Any file you save will update in the browser instantly.

---

## Writing a blog post

Blog posts live in `content/blog/` and are written in Markdown (`.svx` files).

**To create a new post:**

1. In VS Code, right-click the `content/blog/` folder and choose **New File**
2. Name it using the format `YYYY-MM-DD-short-title.svx` — for example:
   ```
   2026-05-17-welcome-constantino.svx
   ```
3. Start the file with a frontmatter block — copy and adapt this template:
   ```
   ---
   title: "Your Post Title Here"
   date: 2026-05-17
   tags: [news, research]
   author: "Your Name"
   description: "A one-sentence summary that appears in the blog listing."
   ---
   ```
4. Write your post below the closing `---` using standard Markdown
5. Save the file — it will appear in the blog immediately in your browser preview

**Markdown quick reference:**

| What you want | What to type |
|---|---|
| **Bold** | `**bold**` |
| *Italic* | `*italic*` |
| Heading | `## Heading` |
| Subheading | `### Subheading` |
| Bullet list | `- item` |
| Numbered list | `1. item` |
| Link | `[link text](https://url.com)` |
| Image | `![alt text](https://image-url.com)` |

---

## Editing existing content

**To find any piece of text on the site:**

Use VS Code's global search: press **Ctrl+Shift+F** and type any phrase from the page you want to edit. This will show you exactly which file contains that text.

**Key files and what they control:**

| File | What it controls |
|---|---|
| `src/lib/config.ts` | Site title, subtitle, social links, roadmap, task list |
| `content/blog/` | All blog posts |
| `src/pages/About.svelte` | The About page |
| `src/pages/Home.svelte` | The homepage (pulls title/subtitle from config.ts) |
| `src/components/` | Reusable parts like the footer, navigation, icons |
| `src/styles/` | Global stylesheet — colours, fonts, spacing |

**The golden rule:** if something appears on multiple pages (like the site title or social links), it almost certainly lives in `config.ts` rather than in each individual page file.

---

## Committing and publishing changes

When you're happy with your changes, publish them using **GitHub Desktop**:

1. Open **GitHub Desktop** — it will automatically show your changed files on the left
2. Write a short **Summary** describing what you changed, for example:
   - `Add welcome blog post`
   - `Update roadmap status for v1.1`
   - `Fix typo in About page`
3. Click **Commit to main**
4. Click **Push origin** (appears at the top after committing)

Your changes are now live on your GitHub fork. If the repository has a GitHub Actions deployment workflow set up, the live site will update automatically within a minute or two.

---

## Ending a work session

1. In PowerShell, press **Ctrl+C** to stop the development server
2. Make sure you've committed and pushed any changes you want to keep

---

## When things go wrong

**The browser isn't updating when I save a file**
- Check the PowerShell window — the server may have crashed. Press Ctrl+C and run `pnpm dev` again.

**I see an error in the browser instead of the site**
- There's likely a syntax error in the file you last edited. Check the PowerShell window for a more specific error message and paste it into Claude for help.

**pnpm dev says "command not found" or similar**
- Make sure you're in the right folder. Run `pwd` — it should end in `geotessera.org`. If not, run `cd C:\Users\frisk\geotessera.org` and try again.

**I made a mess of a file and want to undo all my changes**
- In GitHub Desktop, right-click the file in the changed files list and choose **Discard Changes**. This resets it to the last committed version. This is permanent, so be sure before doing it.

---

## Keeping your fork up to date with the main project

The upstream repository (`ucam-eo/geotessera.org`) will receive updates from the Cambridge team. To pull those changes into your fork periodically:

1. In GitHub Desktop go to **Branch → Merge into current branch**
2. Choose the upstream main branch

Or ask Claude to walk you through this when the time comes — it's worth doing carefully the first time.

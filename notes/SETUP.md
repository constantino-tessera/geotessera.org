# SETUP.md
## Setting up local development for geotessera.org
*(These notes composed by AI)*

This is a one-time process. Once complete, you won't need to repeat these steps — just follow WORKFLOW.md for day-to-day work.

---

## Prerequisites

You need three tools installed before you can run the site locally. Check what you already have by opening PowerShell and running each of these:

```
node --version
git --version
pnpm --version
```

If Node is missing or below version 20, download the LTS version from **nodejs.org**.

If pnpm is missing, install it with:

```
npm install -g pnpm
```

---

## Fix PowerShell script permissions (Windows only)

By default, Windows blocks PowerShell from running scripts. Fix this once with the following steps:

1. Right-click PowerShell in the Start menu and choose **Run as administrator**
2. Run this command:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

3. Type `Y` to confirm
4. Close the administrator window — use a normal PowerShell window from now on

---

## Clone the repository

In PowerShell, navigate to where you want the project folder to live (your home folder is fine):

```
cd C:\Users\frisk
```

Then clone your fork:

```
git clone https://github.com/constantino-tessera/geotessera.org
```

This creates a `geotessera.org` folder. Move into it:

```
cd geotessera.org
```

---

## Install dependencies

This downloads all the packages the site needs to run. It can take a minute:

```
pnpm install
```

If this fails, the most common causes are:
- You're in the wrong folder (check with `pwd` — it should end in `geotessera.org`)
- pnpm isn't installed (check with `pnpm --version`)
- Node is below version 20 (check with `node --version`)

---

## Start the local development server

```
pnpm dev
```

You should see output ending in something like:

```
➜  Local:   http://localhost:5173/
```

Open that URL in your browser. You now have a live local copy of the site. Any file you save will update in the browser automatically — no refresh needed.

To stop the server, click in the terminal and press **Ctrl+C**.

---

## Tools used

| Tool | Purpose |
|---|---|
| **PowerShell** | Running terminal commands |
| **VS Code** | Editing files |
| **GitHub Desktop** | Committing and pushing changes to GitHub |
| **pnpm dev** | Running the local preview of the site |

---

## If you need to start over

If something goes wrong with the cloned folder and you want a clean start, close your terminal (so it's not sitting inside the folder), delete the `geotessera.org` folder in File Explorer, then start again from the Clone step above.

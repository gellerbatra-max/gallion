/**
 * Gelian content editor (offline).
 *
 * A tiny local web app for editing every piece of copy on the site without
 * touching code, and without needing a network connection or a GitHub token.
 * It reads src/content/data/*.json — the same files the CMS at /admin edits —
 * shows every text value as a labelled box, and writes your edits back.
 *
 * Run it with:   npm run edit
 * Then open:     http://localhost:4000
 *
 * This and the CMS are two doors into the same content. Use whichever suits:
 * the CMS publishes to the live site, this one edits the copy on your machine.
 * Don't run both against the same change at once, or one will overwrite the
 * other — same as editing the same document in two places.
 */

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const DATA_DIR = path.join(ROOT, "src", "content", "data");
const PORT = Number(process.env.EDITOR_PORT ?? 4000);
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

/* ------------------------------------------------------------------ *
 * Human-friendly descriptions of each content file.
 * ------------------------------------------------------------------ */

const FILE_INFO = {
  "site.json": {
    title: "Business details",
    blurb:
      "Your name, tagline, email addresses, phone, offices, social links and both menus. These appear in the header, the footer and the contact page.",
    order: 1,
  },
  "home.json": {
    title: "Home page",
    blurb:
      "Every section of the home page, top to bottom — hero, what Gelian is, the vessel, the exchange, how value is identified, the vision statement and the closing call to action.",
    order: 2,
  },
  "about.json": {
    title: "About page",
    blurb:
      "The name, the distinction from a venture firm, the origin story, the long view and the timeline of milestones.",
    order: 3,
  },
  "philosophy.json": {
    title: "Philosophy page",
    blurb: "The opening essay, the eight numbered principles, and what the philosophy rules out.",
    order: 4,
  },
  "contact.json": {
    title: "Contact page",
    blurb: "The form introduction, the contact-details labels, and the six collaboration types.",
    order: 5,
  },
  "portfolio.json": {
    title: "Portfolio page",
    blurb:
      "The Portfolio page copy — its header, the status legend explaining the card labels, and the closing call to action. The cards themselves are edited under Portfolio cards.",
    order: 6,
  },
  "directions.json": {
    title: "Portfolio cards",
    blurb:
      "The six category cards shown on the Portfolio page and previewed on the home page — one set of cards, edited once here.",
    order: 7,
  },
};

/** Keys that control how the page is built, not what it says. */
const LOCKED_KEYS = new Set(["type", "slug", "id"]);

/** Gentle format hints for the fields where the shape matters. */
const HINTS = {
  href: "A web address or a page path such as /about",
  phoneHref: "Must start with tel: and contain digits only, e.g. tel:+94771234567",
  coords: "Shown as decorative text only",
  status: "One of: exploring, developing, selective, active",
  headlineAccent:
    "Must be an exact substring of the headline above it — that phrase renders in gold.",
};

function prettyKey(key) {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** A readable name for a list item, so cards say "Ishara Wijeratne". */
function labelFor(value, fallback) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of ["name", "title", "label", "city", "q", "year", "code"]) {
      if (typeof value[key] === "string" && value[key].trim()) return value[key];
    }
  }
  return fallback;
}

/* ------------------------------------------------------------------ *
 * Reading
 * ------------------------------------------------------------------ */

function collectFields(json) {
  const fields = [];

  function walk(node, ctx) {
    if (typeof node === "string") {
      if (!ctx.key) return;
      fields.push({
        path: ctx.path,
        group: ctx.group,
        groupLabel: ctx.groupLabel,
        key: ctx.key,
        label: prettyKey(ctx.key),
        value: node,
        locked: LOCKED_KEYS.has(ctx.key),
        hint: HINTS[ctx.key] ?? null,
        multiline: node.length > 90,
      });
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((item, i) => {
        const isRecord = item && typeof item === "object" && !Array.isArray(item);
        walk(item, {
          ...ctx,
          path: `${ctx.path}[${i}]`,
          // Objects directly inside a top-level list become their own card.
          group: isRecord && ctx.depth === 0 ? `${ctx.path}[${i}]` : ctx.group,
          groupLabel:
            isRecord && ctx.depth === 0
              ? labelFor(item, `${prettyKey(ctx.rootName)} ${i + 1}`)
              : ctx.groupLabel,
          depth: isRecord ? ctx.depth + 1 : ctx.depth,
          // A bare list of strings keeps its parent's key as the label.
          key: typeof item === "string" ? ctx.key : ctx.key,
        });
      });
      return;
    }

    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) {
        walk(value, { ...ctx, key, path: `${ctx.path}.${key}` });
      }
    }
  }

  for (const [rootName, value] of Object.entries(json)) {
    walk(value, {
      rootName,
      path: rootName,
      group: rootName,
      groupLabel: prettyKey(rootName),
      key: null,
      depth: 0,
    });
  }

  return fields;
}

async function readAll() {
  const names = (await fs.readdir(DATA_DIR)).filter((n) => n.endsWith(".json"));
  const files = [];

  for (const name of names) {
    const json = JSON.parse(await fs.readFile(path.join(DATA_DIR, name), "utf8"));
    const fields = collectFields(json);
    if (fields.length === 0) continue;

    const groups = [];
    const byKey = new Map();
    for (const f of fields) {
      if (!byKey.has(f.group)) {
        const g = { key: f.group, label: f.groupLabel, fields: [] };
        byKey.set(f.group, g);
        groups.push(g);
      }
      byKey.get(f.group).fields.push({
        id: `${name}::${f.path}`,
        path: f.path,
        label: f.label,
        value: f.value,
        locked: f.locked,
        hint: f.hint,
        multiline: f.multiline,
      });
    }

    const info = FILE_INFO[name] ?? { title: name, blurb: "", order: 99 };
    files.push({
      name,
      title: info.title,
      blurb: info.blurb,
      warn: info.warn ?? null,
      order: info.order,
      count: fields.length,
      groups,
    });
  }

  files.sort((a, b) => a.order - b.order);
  return files;
}

/* ------------------------------------------------------------------ *
 * Writing
 * ------------------------------------------------------------------ */

/** Split "contact.offices[1].city" into ["contact","offices",1,"city"]. */
function parsePath(p) {
  const parts = [];
  const re = /([^.[\]]+)|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(p)) !== null) {
    parts.push(m[2] !== undefined ? Number(m[2]) : m[1]);
  }
  return parts;
}

function setAt(root, parts, value) {
  let node = root;
  for (let i = 0; i < parts.length - 1; i++) {
    node = node[parts[i]];
    if (node === undefined) throw new Error(`Path not found: ${parts.join(".")}`);
  }
  const last = parts[parts.length - 1];
  if (typeof node[last] !== "string") {
    throw new Error(`Refusing to write a non-text value at ${parts.join(".")}`);
  }
  node[last] = value;
}

async function saveEdits(edits) {
  const byFile = new Map();
  for (const edit of edits) {
    const [file, fieldPath] = edit.id.split("::");
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push({ path: fieldPath, value: edit.value });
  }

  const written = [];

  for (const [file, fileEdits] of byFile) {
    if (!/^[\w-]+\.json$/.test(file)) throw new Error(`Bad file name: ${file}`);
    const full = path.join(DATA_DIR, file);
    const json = JSON.parse(await fs.readFile(full, "utf8"));

    let count = 0;
    for (const edit of fileEdits) {
      const parts = parsePath(edit.path);
      const key = parts[parts.length - 1];
      if (typeof key === "string" && LOCKED_KEYS.has(key)) continue;
      setAt(json, parts, edit.value);
      count++;
    }

    if (count === 0) continue;
    await fs.writeFile(full, JSON.stringify(json, null, 2) + "\n", "utf8");
    written.push({ file, count });
  }

  return written;
}

/* ------------------------------------------------------------------ *
 * Server
 * ------------------------------------------------------------------ */

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && (req.url === "/" || req.url.startsWith("/?"))) {
      const html = await fs.readFile(path.join(HERE, "ui.html"), "utf8");
      return send(res, 200, html.replace("__SITE_URL__", SITE_URL), "text/html; charset=utf-8");
    }

    if (req.method === "GET" && req.url === "/api/content") {
      return send(res, 200, { files: await readAll(), siteUrl: SITE_URL });
    }

    if (req.method === "POST" && req.url === "/api/save") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const { edits } = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      if (!Array.isArray(edits)) return send(res, 400, { error: "Bad payload" });
      return send(res, 200, { ok: true, written: await saveEdits(edits) });
    }

    send(res, 404, { error: "Not found" });
  } catch (err) {
    console.error("[editor]", err);
    send(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`\n  Gelian content editor\n`);
  console.log(`  Open:     http://localhost:${PORT}`);
  console.log(`  Editing:  ${DATA_DIR}`);
  console.log(`  Preview:  ${SITE_URL}  (run "npm run dev" in another window)\n`);
});

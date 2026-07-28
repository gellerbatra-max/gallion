/**
 * Gelian content editor.
 *
 * A tiny local web app for editing every piece of copy on the site without
 * touching code. It reads the files in src/content/, finds each text value,
 * shows them as labelled boxes in the browser, and writes your edits straight
 * back into the same files.
 *
 * Run it with:   npm run edit
 * Then open:     http://localhost:4000
 *
 * Nothing is uploaded anywhere. It only touches files on this machine, and it
 * only ever replaces the text inside quotes — never the surrounding code.
 */

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..", "..");
const CONTENT_DIR = path.join(ROOT, "src", "content");
const PORT = Number(process.env.EDITOR_PORT ?? 4000);
const SITE_URL = process.env.SITE_URL ?? "http://localhost:3000";

/* ------------------------------------------------------------------ *
 * Human-friendly descriptions of each content file.
 * ------------------------------------------------------------------ */

const FILE_INFO = {
  "site.ts": {
    title: "Business details",
    blurb:
      "Your name, tagline, email addresses, phone, offices and social links. These appear in the header, the footer and the contact page.",
    order: 1,
  },
  "team.ts": {
    title: "Leadership",
    blurb:
      "The people shown on the About page. The names currently here are invented placeholders — replace or remove them before the site is public.",
    order: 2,
    warn: "These are invented placeholder people. Do not leave them published.",
  },
  "journey.ts": {
    title: "Timeline",
    blurb:
      "The year-by-year story on the About page. The dates currently here are illustrative.",
    order: 3,
  },
  "themes.ts": {
    title: "Areas of interest",
    blurb: "The themes shown on the home page and the Future Ventures page.",
    order: 4,
  },
  "ventures.ts": {
    title: "Ventures",
    blurb: "The venture list and the status labels used to describe them.",
    order: 5,
  },
  "principles.ts": {
    title: "Philosophy",
    blurb: "The principles that make up the Philosophy page.",
    order: 6,
  },
  "process.ts": {
    title: "How you work",
    blurb:
      "Venture stages, the criteria you evaluate against, and the frequently-asked questions.",
    order: 7,
  },
  "insights.ts": {
    title: "Journal articles",
    blurb:
      "The written pieces under Insights. Each article's paragraphs are listed in order.",
    order: 8,
  },
};

/** Keys that control how the page is built, not what it says. */
const LOCKED_KEYS = new Set(["type", "slug"]);

/** Gentle format hints for the fields where the shape matters. */
const HINTS = {
  href: "A web address or a page path such as /about",
  phoneHref: "Must start with tel: and contain digits only, e.g. tel:+94771234567",
  date: "Format: YYYY-MM-DD",
  coords: "Shown as decorative text only",
  initials: "Two letters, shown in the circle avatar",
  email: "A plain email address",
};

/** Turn a key like "readingTime" into "Reading time". */
function prettyKey(key) {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/* ------------------------------------------------------------------ *
 * Reading: pull every text value out of a content file.
 * ------------------------------------------------------------------ */

/**
 * Find a readable name for an item in a list, so the editor can show
 * "Ishara Wijeratne" instead of "team[1]".
 */
function labelForNode(node) {
  if (!ts.isObjectLiteralExpression(node)) return null;
  const preferred = [
    "name",
    "title",
    "label",
    "city",
    "question",
    "year",
    "heading",
    "slug",
  ];
  for (const key of preferred) {
    for (const prop of node.properties) {
      if (
        ts.isPropertyAssignment(prop) &&
        prop.name &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === key &&
        (ts.isStringLiteral(prop.initializer) ||
          ts.isNoSubstitutionTemplateLiteral(prop.initializer))
      ) {
        return prop.initializer.text;
      }
    }
  }
  return null;
}

function extractFields(source, fileName) {
  const sf = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const fields = [];

  function walk(node, ctx) {
    // A piece of text we can edit.
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (!ctx.key) return; // bare strings with no key give the user no context
      fields.push({
        file: fileName,
        path: ctx.path,
        group: ctx.group,
        groupLabel: ctx.groupLabel,
        key: ctx.key,
        label: prettyKey(ctx.key),
        value: node.text,
        start: node.getStart(sf),
        end: node.end,
        locked: LOCKED_KEYS.has(ctx.key),
        hint: HINTS[ctx.key] ?? null,
        multiline: node.text.length > 90,
      });
      return;
    }

    if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((el, i) => {
        const itemLabel = labelForNode(el);
        const isRecord = ts.isObjectLiteralExpression(el);
        walk(el, {
          ...ctx,
          path: `${ctx.path}[${i}]`,
          // Each object in a top-level list becomes its own card.
          group: isRecord && ctx.depth === 0 ? `${ctx.path}[${i}]` : ctx.group,
          groupLabel:
            isRecord && ctx.depth === 0
              ? itemLabel || `${prettyKey(ctx.rootName)} ${i + 1}`
              : ctx.groupLabel,
          depth: isRecord ? ctx.depth + 1 : ctx.depth,
        });
      });
      return;
    }

    if (ts.isObjectLiteralExpression(node)) {
      node.properties.forEach((prop) => {
        if (!ts.isPropertyAssignment(prop) || !prop.name) return;
        const key = ts.isIdentifier(prop.name)
          ? prop.name.text
          : ts.isStringLiteral(prop.name)
            ? prop.name.text
            : null;
        if (!key) return;
        walk(prop.initializer, {
          ...ctx,
          key,
          path: `${ctx.path}.${key}`,
        });
      });
      return;
    }

    node.forEachChild((child) => walk(child, ctx));
  }

  // Only walk exported constants — never type declarations, which contain
  // string literals that are part of the code's structure.
  sf.statements.forEach((stmt) => {
    if (!ts.isVariableStatement(stmt)) return;
    const exported = stmt.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!exported) return;

    stmt.declarationList.declarations.forEach((decl) => {
      if (!decl.initializer || !ts.isIdentifier(decl.name)) return;
      const rootName = decl.name.text;
      // `as const` wrappers sit between the name and the value.
      let value = decl.initializer;
      while (ts.isAsExpression(value) || ts.isSatisfiesExpression(value)) {
        value = value.expression;
      }
      walk(value, {
        rootName,
        path: rootName,
        group: rootName,
        groupLabel: prettyKey(rootName),
        key: null,
        depth: 0,
      });
    });
  });

  return fields;
}

async function readAll() {
  const names = (await fs.readdir(CONTENT_DIR)).filter((n) => n.endsWith(".ts"));
  const files = [];

  for (const name of names) {
    const source = await fs.readFile(path.join(CONTENT_DIR, name), "utf8");
    const fields = extractFields(source, name);
    if (fields.length === 0) continue;

    // Group the flat field list into cards for the interface.
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
 * Writing: put edited text back into the file, in place.
 * ------------------------------------------------------------------ */

async function saveEdits(edits) {
  // Group the incoming edits by file.
  const byFile = new Map();
  for (const edit of edits) {
    const [file, fieldPath] = edit.id.split("::");
    if (!byFile.has(file)) byFile.set(file, []);
    byFile.get(file).push({ path: fieldPath, value: edit.value });
  }

  const written = [];

  for (const [file, fileEdits] of byFile) {
    if (!/^[\w.-]+\.ts$/.test(file)) throw new Error(`Bad file name: ${file}`);
    const full = path.join(CONTENT_DIR, file);
    let source = await fs.readFile(full, "utf8");

    // Re-read positions from the current file so offsets are always fresh.
    const fields = extractFields(source, file);
    const index = new Map(fields.map((f) => [f.path, f]));

    const applied = [];
    for (const edit of fileEdits) {
      const target = index.get(edit.path);
      if (!target) throw new Error(`Could not find ${edit.path} in ${file}`);
      if (target.locked) continue; // structural — refuse silently
      if (target.value === edit.value) continue; // unchanged
      applied.push({ ...target, next: edit.value });
    }

    if (applied.length === 0) continue;

    // Apply back-to-front so earlier offsets stay valid.
    applied.sort((a, b) => b.start - a.start);
    for (const change of applied) {
      // JSON.stringify gives a correctly escaped double-quoted string,
      // which is also valid TypeScript.
      const literal = JSON.stringify(change.next);
      source = source.slice(0, change.start) + literal + source.slice(change.end);
    }

    // Safety net: the result must still parse as TypeScript.
    const check = ts.createSourceFile(
      file,
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    // @ts-expect-error - parseDiagnostics is internal but reliable here.
    const errors = check.parseDiagnostics ?? [];
    if (errors.length > 0) {
      throw new Error(
        `Refusing to save ${file} — the result would not be valid. No changes were written.`,
      );
    }

    await fs.writeFile(full, source, "utf8");
    written.push({ file, count: applied.length });
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
      const written = await saveEdits(edits);
      return send(res, 200, { ok: true, written });
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
  console.log(`  Editing:  ${CONTENT_DIR}`);
  console.log(`  Preview:  ${SITE_URL}  (run "npm run dev" in another window)\n`);
});

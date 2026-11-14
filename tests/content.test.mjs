import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  mkdtemp,
  mkdir,
  writeFile,
  rm,
  readFile,
  readdir,
  access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateContent } from "../scripts/validate-content.mjs";

test("public content rejects restricted metadata", async () => {
  const dir = await mkdtemp(join(tmpdir(), "saleswise-docs-"));
  try {
    await mkdir(join(dir, "en"));
    await writeFile(
      join(dir, "en", "bad.md"),
      "---\ntitle: Private\nvisibility: internal\n---\nPrivate",
    );
    await assert.rejects(validateContent(dir), /Restricted metadata/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("seed contains no restricted source references", async () => {
  assert.ok((await validateContent()) > 0);
});

test("English and Arabic guides have matching pages, valid links, and available images", async () => {
  const root = join(import.meta.dirname, "..", "content", "docs");
  async function pages(dir, prefix = "") {
    const result = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const name = join(prefix, entry.name);
      if (entry.isDirectory())
        result.push(...(await pages(join(dir, entry.name), name)));
      else if (/\.mdx?$/.test(entry.name)) result.push(name);
    }
    return result.sort();
  }

  const english = await pages(join(root, "en"));
  const arabic = await pages(join(root, "ar"));
  assert.deepEqual(english, arabic);

  for (const lang of ["en", "ar"]) {
    for (const file of english) {
      const content = await readFile(join(root, lang, file), "utf8");
      for (const [, linkedLang, slug] of content.matchAll(
        /\]\(\/(en|ar)\/docs(?:\/([^\s)#]+))?\)/g,
      )) {
        assert.equal(
          linkedLang,
          lang,
          `${lang}/${file} links to another locale`,
        );
        const targets = slug
          ? [`${slug}.md`, `${slug}/index.md`, `${slug}.mdx`]
          : ["index.md"];
        assert.ok(
          targets.some((target) => english.includes(target)),
          `${lang}/${file} links to missing ${slug ?? "index"}`,
        );
      }
      for (const [, image] of content.matchAll(
        /!\[[^\]]*\]\((\/images\/[^\s)]+)\)/g,
      )) {
        await assert.doesNotReject(
          access(join(import.meta.dirname, "..", "public", image.slice(1))),
          `${lang}/${file} references missing ${image}`,
        );
      }
    }
  }
});

test("home sections link every public guide exactly once", async () => {
  const appRoot = join(import.meta.dirname, "..");
  const page = await readFile(
    join(appRoot, "app", "[lang]", "page.tsx"),
    "utf8",
  );
  assert.equal(
    [...page.matchAll(/<section\b/g)].length,
    8,
    "home must have eight page rows",
  );
  const source = await readFile(
    join(appRoot, "lib", "home-content.ts"),
    "utf8",
  );
  const sections = [...source.matchAll(/key: "([^"]+)"/g)].map(
    (match) => match[1],
  );
  const slugs = [...source.matchAll(/slug: "([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal(sections.length, 8);
  assert.equal(
    new Set(slugs).size,
    slugs.length,
    "a guide appears in more than one home section",
  );

  async function guideSlugs(dir, prefix = "") {
    const result = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const name = join(prefix, entry.name);
      if (entry.isDirectory())
        result.push(...(await guideSlugs(join(dir, entry.name), name)));
      else if (
        entry.name.endsWith(".md") &&
        name !== "index.md" &&
        name !== "markdown-reference.md"
      )
        result.push(name.slice(0, -3).replace(/\/index$/, ""));
    }
    return result;
  }

  const guides = await guideSlugs(join(appRoot, "content", "docs", "en"));
  assert.deepEqual(slugs.sort(), guides.sort());
});

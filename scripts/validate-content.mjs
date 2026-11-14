import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("../content/docs/", import.meta.url);
const forbidden = /(?:visibility\s*:\s*(?:tenant|platform|internal)|sourceRefs\s*:|requiredPermissions\s*:|requiredFeatures\s*:|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY|sk-[A-Za-z0-9_-]{16,})/i;

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(path));
    else if (/\.mdx?$/.test(entry.name)) result.push(path);
  }
  return result;
}

export async function validateContent(contentRoot = root) {
  const dir = contentRoot instanceof URL ? contentRoot.pathname : contentRoot;
  const contentFiles = await files(dir);
  if (contentFiles.length === 0) throw new Error("Public docs have no content");
  for (const file of contentFiles) {
    const body = await readFile(file, "utf8");
    if (forbidden.test(body)) throw new Error(`Restricted metadata or secret in ${relative(dir, file)}`);
    if (!body.startsWith("---\n") || !/^title:\s*\S+/m.test(body)) throw new Error(`Missing public metadata in ${relative(dir, file)}`);
  }
  return contentFiles.length;
}

if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  validateContent().then((count) => console.log(`Validated ${count} public articles`)).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

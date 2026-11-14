import { localMd } from "@fumadocs/local-md";
import { dynamicLoader } from "fumadocs-core/source";
import { remarkMdxMermaid } from "fumadocs-core/mdx-plugins/remark-mdx-mermaid";

const docs = localMd({
  dir: "content/docs",
  mdOptions: { remarkPlugins: [remarkMdxMermaid] },
});
const loader = dynamicLoader(docs.dynamicSource(), { baseUrl: "/docs" });

export async function getSource() {
  return loader.get();
}

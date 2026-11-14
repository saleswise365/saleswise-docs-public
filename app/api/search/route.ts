import { getSource } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

const search = createFromSource(getSource, { language: "english" });

export async function GET(request: Request) {
  const response = await search.GET(request);
  if (!response.ok) return response;
  const results = (await response.json()) as Array<{
    id: string;
    url: string;
    type: string;
    content: string;
  }>;
  const routeUrl = (value: string) =>
    value.replace(/^\/docs\/(en|ar)(?=\/|$|#)/, "/$1/docs");
  const params = new URL(request.url).searchParams;
  const locale = params.get("locale");
  const query = params.get("query")?.toLocaleLowerCase() ?? "";
  const rank = (result: { content: string }) => {
    const title = result.content.toLocaleLowerCase();
    return title === query
      ? 3
      : title.startsWith(query)
        ? 2
        : title.includes(query)
          ? 1
          : 0;
  };
  const localized = results
    .filter((result) => result.type === "page")
    .map((result) => ({
      ...result,
      id: routeUrl(result.id),
      url: routeUrl(result.url),
    }))
    .filter(
      (result) =>
        (locale !== "en" && locale !== "ar") ||
        result.url.startsWith(`/${locale}/docs`),
    )
    .sort((a, b) => rank(b) - rank(a));
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(JSON.stringify(localized), {
    status: response.status,
    headers,
  });
}

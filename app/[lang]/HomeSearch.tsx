"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/lib/home-content";

type SearchResult = { type: string; url: string; content: string };

async function searchGuides(
  query: string,
  lang: Locale,
  signal?: AbortSignal,
): Promise<SearchResult[]> {
  const response = await fetch(
    `/api/search?query=${encodeURIComponent(query)}&locale=${lang}`,
    { signal },
  );
  if (!response.ok) throw new Error("Search unavailable");
  const matches = (await response.json()) as SearchResult[];
  const unique = new Map<string, SearchResult>();
  for (const match of matches) {
    if (match.type === "page" && !unique.has(match.url))
      unique.set(match.url, match);
  }
  const normalized = query.toLocaleLowerCase();
  const rank = (result: SearchResult) => {
    const title = result.content.toLocaleLowerCase();
    return title === normalized
      ? 3
      : title.startsWith(normalized)
        ? 2
        : title.includes(normalized)
          ? 1
          : 0;
  };
  return [...unique.values()].sort((a, b) => rank(b) - rank(a)).slice(0, 6);
}

export function HomeSearch({
  lang,
  variant = "home",
}: {
  readonly lang: Locale;
  readonly variant?: "home" | "sidebar";
}) {
  const router = useRouter();
  const inputId = variant === "sidebar" ? "sidebar-search" : "home-search";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (window.location.hash === `#${inputId}`)
      document.getElementById(inputId)?.focus();
  }, [inputId]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSearched(false);
      setError(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        setResults(await searchGuides(trimmed, lang, controller.signal));
        setSearched(true);
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setSearched(true);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, lang]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      document.getElementById(inputId)?.focus();
      return;
    }
    try {
      const first = (await searchGuides(trimmed, lang))[0];
      if (first) {
        setQuery("");
        router.push(first.url);
      } else setSearched(true);
    } catch {
      setSearched(true);
      setError(true);
    }
  }

  return (
    <div
      className={`sw-search-wrap ${variant === "sidebar" ? "sw-search-sidebar" : ""}`}
    >
      <form className="sw-search" role="search" onSubmit={submit}>
        <label className="sw-visually-hidden" htmlFor={inputId}>
          {lang === "ar" ? "ابحث في الأدلة" : "Search guides"}
        </label>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setResults([]);
            setSearched(false);
            setError(false);
          }}
          placeholder={
            variant === "sidebar"
              ? lang === "ar"
                ? "ابحث في الأدلة"
                : "Search guides"
              : lang === "ar"
                ? "ابحث عن الطلبات أو السلة أو المساعدة"
                : "Search orders, cart, help…"
          }
          autoComplete="off"
        />
        <button type="submit">
          {variant === "sidebar"
            ? lang === "ar"
              ? "اذهب"
              : "Go"
            : lang === "ar"
              ? "ابحث"
              : "Search"}
        </button>
      </form>
      {query.trim() && (
        <div className="sw-search-results" role="status" aria-live="polite">
          {loading ? (
            <p>{lang === "ar" ? "جارٍ البحث…" : "Searching…"}</p>
          ) : error ? (
            <p>
              {lang === "ar"
                ? "تعذر البحث. حاول مجددًا."
                : "Search is unavailable. Try again."}
            </p>
          ) : results.length ? (
            <ul>
              {results.map((result) => (
                <li key={result.url}>
                  <Link href={result.url} onClick={() => setQuery("")}>
                    {result.content}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searched ? (
            <p>
              {lang === "ar"
                ? "لا توجد أدلة مطابقة. جرّب كلمة أخرى."
                : "No matching guides. Try another word."}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

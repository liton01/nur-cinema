// Server-side TMDB helpers. The API key never reaches the browser.
const BASE = "https://api.themoviedb.org/3";

// Edit these two lists to change what the site shows.
export const KEYWORDS = [
  "islam", "muslim", "prophet muhammad", "islamic history",
  "hajj", "mosque", "quran", "sufism", "ramadan", "caliphate",
];
export const FEATURED = [
  "The Message", "Lion of the Desert", "Muhammad: The Messenger of God",
  "Bilal: A New Breed of Hero", "The Sultan and the Saint", "Omar",
  "Journey to Mecca", "The Great Battle of Karbala", "Ertugrul",
];

async function tmdb(path, params = {}, revalidate = 3600) {
  const key = process.env.TMDB_API_KEY;
  if (!key || key.includes("PASTE_YOUR_KEY")) throw new Error("MISSING_KEY");
  const url = new URL(BASE + path);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "en-US");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) throw new Error("TMDB_" + res.status);
  return res.json();
}

function normalize(item, forcedType) {
  const type = forcedType || item.media_type;
  return {
    id: item.id,
    type,
    title: item.title || item.name || "Untitled",
    poster: item.poster_path || null,
    backdrop: item.backdrop_path || null,
    year: (item.release_date || item.first_air_date || "").slice(0, 4),
    rating: item.vote_average || 0,
  };
}

let keywordCache = null;
async function keywordIds() {
  if (keywordCache) return keywordCache;
  const found = await Promise.all(
    KEYWORDS.map((q) => tmdb("/search/keyword", { query: q }, 86400).catch(() => ({ results: [] })))
  );
  const ids = new Set();
  found.forEach((f, i) =>
    f.results.filter((r) => r.name.toLowerCase() === KEYWORDS[i]).forEach((r) => ids.add(r.id))
  );
  keywordCache = [...ids];
  return keywordCache;
}

// type: "movie" | "tv"; q: optional search text. Pagination gives (nearly) unlimited titles.
export async function listTitles({ type = "movie", q = "", page = 1 }) {
  page = Math.min(Math.max(parseInt(page) || 1, 1), 500);
  if (q) {
    const d = await tmdb("/search/multi", { query: q, page, include_adult: "false" }, 600);
    return {
      results: d.results.filter((r) => r.media_type === "movie" || r.media_type === "tv").map((r) => normalize(r)),
      totalPages: d.total_pages || 1,
    };
  }
  const t = type === "tv" ? "tv" : "movie";
  const ids = await keywordIds();
  const d = await tmdb(`/discover/${t}`, {
    with_keywords: ids.join("|"),
    sort_by: "popularity.desc",
    include_adult: "false",
    "vote_count.gte": 3,
    page,
  });
  return { results: d.results.map((r) => normalize(r, t)), totalPages: d.total_pages || 1 };
}

export async function getFeatured() {
  const found = await Promise.all(
    FEATURED.map((t) =>
      tmdb("/search/movie", { query: t, include_adult: "false" }, 86400)
        .then((d) => d.results[0]).catch(() => null)
    )
  );
  const seen = new Set();
  return found.filter((m) => m && !seen.has(m.id) && seen.add(m.id)).map((m) => normalize(m, "movie"));
}

export async function getDetails(type, id) {
  const t = type === "tv" ? "tv" : "movie";
  const d = await tmdb(`/${t}/${id}`, { append_to_response: "videos,credits,recommendations" }, 3600);
  const vids = d.videos?.results || [];
  const trailer = vids.find((v) => v.site === "YouTube" && v.type === "Trailer") || vids.find((v) => v.site === "YouTube");
  return {
    ...normalize(d, t),
    overview: d.overview,
    tagline: d.tagline,
    runtime: d.runtime || d.episode_run_time?.[0] || null,
    genres: (d.genres || []).map((g) => g.name),
    cast: (d.credits?.cast || []).slice(0, 10).map((c) => c.name),
    trailerKey: trailer?.key || null,
    similar: (d.recommendations?.results || []).slice(0, 6).map((r) => normalize(r, t)),
  };
}

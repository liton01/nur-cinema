"use client";
import { useState } from "react";
import MovieCard from "./MovieCard";

// Shows the first page from the server, then loads more from /api/list.
export default function MovieGrid({ initial, totalPages, type, q = "" }) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function more() {
    setLoading(true);
    setError("");
    try {
      const next = page + 1;
      const res = await fetch(`/api/list?type=${type}&q=${encodeURIComponent(q)}&page=${next}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.type + p.id));
        return [...prev, ...data.results.filter((r) => !seen.has(r.type + r.id))];
      });
      setPage(next);
    } catch {
      setError("Could not load more. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) return <p className="status">No titles found.</p>;

  return (
    <>
      <div className="grid">{items.map((m) => <MovieCard key={m.type + m.id} item={m} />)}</div>
      {error && <p className="status">{error}</p>}
      {page < totalPages && (
        <button className="btn more" onClick={more} disabled={loading}>
          {loading ? "Loading…" : "Load more"}
        </button>
      )}
    </>
  );
}

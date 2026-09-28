"use client";
import MovieCard from "@/components/MovieCard";
import { useSaved } from "@/lib/useSaved";

export default function MyList() {
  const { saved, ready } = useSaved();
  return (
    <main className="page">
      <h1>My list</h1>
      {!ready ? <p className="status">Loading…</p> : saved.length === 0 ? (
        <p className="status">Nothing saved yet. Open a title and choose Add to my list.</p>
      ) : (
        <div className="grid">{saved.map((m) => <MovieCard key={m.type + m.id} item={m} />)}</div>
      )}
    </main>
  );
}

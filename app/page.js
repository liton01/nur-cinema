import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import Notice from "@/components/Notice";
import { getFeatured, listTitles } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featured = [], popular = [], error = null;
  try {
    [featured, { results: popular }] = await Promise.all([getFeatured(), listTitles({ type: "movie", page: 1 })]);
  } catch (e) {
    error = e.message;
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Films and series from Islamic history and Muslim life</h1>
        <p>Browse thousands of titles. Open any one for the story, cast and trailer.</p>
        <div className="hero-actions">
          <Link className="btn" href="/movies">Browse movies</Link>
          <Link className="btn ghost" href="/series">Browse series</Link>
        </div>
      </section>

      {error ? <Notice error={error} /> : (
        <>
          <h2 className="sec">Classics</h2>
          <div className="grid">{featured.map((m) => <MovieCard key={m.id} item={m} />)}</div>

          <div className="sec-row">
            <h2 className="sec">Popular now</h2>
            <Link href="/movies" className="more-link">See all movies</Link>
          </div>
          <div className="grid">{popular.slice(0, 12).map((m) => <MovieCard key={m.id} item={m} />)}</div>
        </>
      )}
    </main>
  );
}

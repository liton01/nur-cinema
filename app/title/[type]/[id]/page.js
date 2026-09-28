import Image from "next/image";
import { notFound } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import Notice from "@/components/Notice";
import Poster from "@/components/Poster";
import SaveButton from "@/components/SaveButton";
import { getDetails } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

async function load(params) {
  if (!["movie", "tv"].includes(params.type) || !/^\d+$/.test(params.id)) return { notFound: true };
  try {
    return { data: await getDetails(params.type, params.id) };
  } catch (e) {
    if (e.message === "TMDB_404") return { notFound: true };
    return { error: e.message };
  }
}

export async function generateMetadata({ params }) {
  const r = await load(params);
  if (!r.data) return { title: "Title" };
  return { title: r.data.title, description: (r.data.overview || "").slice(0, 155) };
}

export default async function TitlePage({ params }) {
  const r = await load(params);
  if (r.notFound) notFound();
  if (r.error) return <main className="page"><Notice error={r.error} /></main>;
  const d = r.data;
  const meta = [d.year, d.runtime ? `${d.runtime} min` : "", d.genres.join(", ")].filter(Boolean).join(" · ");

  return (
    <main className="page detail">
      <div className="player">
        {d.trailerKey ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${d.trailerKey}`}
            title={`${d.title} trailer`}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : d.backdrop ? (
          <Image src={`https://image.tmdb.org/t/p/w1280${d.backdrop}`} alt="" fill sizes="900px" style={{ objectFit: "cover" }} priority />
        ) : null}
      </div>

      <div className="detail-body">
        <div className="detail-poster"><div className="poster"><Poster path={d.poster} title={d.title} priority /></div></div>
        <div>
          <h1>{d.title}</h1>
          {d.tagline && <p className="tagline">{d.tagline}</p>}
          <p className="meta">{meta}{d.rating ? ` · ★ ${d.rating.toFixed(1)}` : ""}</p>
          <p className="overview">{d.overview || "No description available."}</p>
          {d.cast.length > 0 && <p className="meta"><b>Cast:</b> {d.cast.join(", ")}</p>}
          <SaveButton item={{ id: d.id, type: d.type, title: d.title, poster: d.poster, year: d.year, rating: d.rating }} />
        </div>
      </div>

      {d.similar.length > 0 && (
        <>
          <h2 className="sec">You may also like</h2>
          <div className="grid">{d.similar.map((m) => <MovieCard key={m.id} item={m} />)}</div>
        </>
      )}
    </main>
  );
}

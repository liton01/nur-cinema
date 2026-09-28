import Link from "next/link";
import Poster from "./Poster";

export default function MovieCard({ item }) {
  return (
    <Link href={`/title/${item.type}/${item.id}`} className="card">
      <div className="poster"><Poster path={item.poster} title={item.title} /></div>
      <div className="cap">
        <b>{item.title}</b>
        <small>
          {item.type === "tv" ? "Series" : "Movie"}
          {item.year ? ` · ${item.year}` : ""}
          {item.rating ? ` · ★ ${item.rating.toFixed(1)}` : ""}
        </small>
      </div>
    </Link>
  );
}

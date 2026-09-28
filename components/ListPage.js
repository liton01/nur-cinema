import MovieGrid from "./MovieGrid";
import Notice from "./Notice";
import { listTitles } from "@/lib/tmdb";

export default async function ListPage({ type, q = "", title }) {
  let data;
  try {
    data = await listTitles({ type, q, page: 1 });
  } catch (e) {
    return <main className="page"><h1>{title}</h1><Notice error={e.message} /></main>;
  }
  return (
    <main className="page">
      <h1>{title}</h1>
      <MovieGrid initial={data.results} totalPages={data.totalPages} type={type} q={q} />
    </main>
  );
}

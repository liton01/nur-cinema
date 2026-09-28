import ListPage from "@/components/ListPage";
export const metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default function Search({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  if (!q) return <main className="page"><h1>Search</h1><p className="status">Type a title in the search box above.</p></main>;
  return <ListPage type="movie" q={q} title={`Results for “${q}”`} />;
}

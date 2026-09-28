import ListPage from "@/components/ListPage";
export const metadata = { title: "Islamic Movies" };
export const dynamic = "force-dynamic";
export default function Movies() { return <ListPage type="movie" title="Islamic movies" />; }

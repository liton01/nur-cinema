import Image from "next/image";

export default function Poster({ path, title, sizes = "(max-width:600px) 45vw, 200px", priority = false }) {
  if (!path) return <div className="noposter">{title}</div>;
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500${path}`}
      alt={`${title} poster`}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );
}

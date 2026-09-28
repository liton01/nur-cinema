"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/series", label: "Series" },
  { href: "/my-list", label: "My list" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    const v = q.trim();
    if (v) router.push(`/search?q=${encodeURIComponent(v)}`);
  }

  return (
    <header className="top">
      <Link href="/" className="brand">
        <span className="brand-ar" lang="ar" dir="rtl">نور</span>
        <span className="brand-en">Nur Cinema</span>
      </Link>
      <nav className="nav" aria-label="Main">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : ""}>{l.label}</Link>
        ))}
      </nav>
      <form className="search" onSubmit={submit} role="search">
        <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search movies or series" aria-label="Search" />
        <button className="btn" type="submit">Search</button>
      </form>
    </header>
  );
}

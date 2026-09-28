import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: { default: "Nur Cinema – Islamic Movies & Series", template: "%s | Nur Cinema" },
  description: "Discover Islamic movies and series: history, faith and Muslim life. Posters, details and trailers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="foot">
          Data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </footer>
      </body>
    </html>
  );
}

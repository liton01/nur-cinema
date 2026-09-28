export default function Notice({ error }) {
  if (error === "MISSING_KEY") {
    return (
      <div className="notice">
        <h2>One step left: add your TMDB API key</h2>
        <p>Copy <code>.env.example</code> to <code>.env.local</code>, paste your free key from themoviedb.org/settings/api, then restart <code>npm run dev</code>.</p>
      </div>
    );
  }
  return (
    <div className="notice">
      <h2>Could not load titles</h2>
      <p>Check your internet connection and API key, then reload the page. ({error})</p>
    </div>
  );
}

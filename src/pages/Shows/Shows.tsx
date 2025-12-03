import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Show } from "./ShowDetails";

function Shows() {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    async function fetchShows() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=422c853c721e4c91f3053995dbde2786`
        );

        if (res.status === 404) {
          setError("User not found");
          return;
        }

        if (!res.ok) {
          setError("Something went wrong...");
          return;
        }

        const data = await res.json();
        console.log(data.results);
        setShows(data.results);
      } catch (err) {
        setError("Failed to fetch.");
      } finally {
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <div className="movies-container">
      <div>
        <input
          type="text"
          placeholder="Search for a Show..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <h1 className="main-title">All The TV Shows</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movie-grid">
        {filteredShows.length > 0
          ? filteredShows.map((show) => (
              <Link to={`/shows/${show.id}`} className="movie-card-link">
                <div key={show.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show?.poster_path}`}
                    alt={show.name}
                    className="movie-poster"
                  />
                  <div className="movie-title-overlay">{show.name}</div>
                </div>
              </Link>
            ))
          : !loading && <p>No shows found matching your search criteria.</p>}
      </div>
    </div>
  );
}

export default Shows;

import { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Movie } from "./MovieDetails";

function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=422c853c721e4c91f3053995dbde2786`
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
        setMovies(data.results);
      } catch (err) {
        setError("Failed to fetch.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search for a Movie..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="movies-container">
        <h1 className="main-title">All The Movies</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="movie-grid">
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => (
                <Link
                  to={`/movies/${movie.id}`}
                  className="movie-card-link"
                  key={movie.id}
                >
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <div className="movie-title-overlay">{movie.title}</div>
                  </div>
                </Link>
              ))
            : !loading && <p>No movies found matching your search criteria.</p>}
        </div>
      </div>
    </div>
  );
}

export default Movies;

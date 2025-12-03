import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import BackButton from "../../components/BackButton";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=422c853c721e4c91f3053995dbde2786`
        );

        if (res.status === 404) {
          setError("Movie not found");
          return;
        }

        if (!res.ok) {
          setError("Something went wrong...");
          return;
        }

        const data = await res.json();
        console.log(data);
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  return (
    <>
      <div className={styles.movieCard}>
        <h1 className={styles.title}>{movie?.title}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt={movie?.title}
          className={styles.poster}
        />
        <p>
          <span className={styles.label}>Overview:</span> "{movie?.overview}"
        </p>
        <p>
          <span className={styles.label}>Release Date:</span>{" "}
          {movie?.release_date}
        </p>
      </div>
      <BackButton />
    </>
  );
}

export default MovieDetails;

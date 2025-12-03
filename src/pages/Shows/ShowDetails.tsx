import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ShowDetails.module.css";
import BackButton from "../../components/BackButton";

export interface Show {
  id: number;
  name: string;
  poster_path: string;
  overview: string;
}

function ShowDetails() {
  const { showId } = useParams();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShow() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${showId}?api_key=422c853c721e4c91f3053995dbde2786`
        );

        if (res.status === 404) {
          setError("Show not found");
          return;
        }

        if (!res.ok) {
          setError("Something went wrong...");
          return;
        }

        const data = await res.json();
        console.log(data);
        setShow(data);
      } catch (err) {
        setError("Failed to fetch.");
      } finally {
        setLoading(false);
      }
    }

    fetchShow();
  }, [showId]);
  return (
    <>
      <div className={styles.movieCard}>
        <h1 className={styles.title}>{show?.name}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <img
          src={`https://image.tmdb.org/t/p/w500${show?.poster_path}`}
          alt={show?.name}
          className={styles.poster}
        />
        <p>
          <span className={styles.label}>Overview:</span> "{show?.overview}"
        </p>
      </div>
      <BackButton />
    </>
  );
}

export default ShowDetails;

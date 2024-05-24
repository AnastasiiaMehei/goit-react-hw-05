import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getMoviesDetails from "../../../movieDetails-api";
import MoviesPage from "../MoviesPage/MoviesPage";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    getMoviesDetails(movieId)
      .then((data) => setMovieDetails(data))
      .catch((error) =>
        console.error("Помилка при отриманні деталей фільму:", error)
      )
      .finally(() => setLoading(false));
  }, [movieId]);
  return (
    <div>
      <button className={css.button}>
        <GoArrowLeft className={css.icon} />
        Go back
      </button>
      {loading && <b>No info. Try again...</b>}
      {movieDetails && <MoviesPage movieDetails={movieDetails} />}
    </div>
  );
}

import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import getMoviesDetails from "../../../movieDetails-api";
// import MoviesPage from "../MoviesPage/MoviesPage";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  //   const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  //   useEffect(() => {
  //     getMoviesDetails(movieId)
  //       .then((data) => setMovieDetails(data))
  //       .catch((error) =>
  //         console.error("Помилка при отриманні деталей фільму:", error)
  //       )
  //       .finally(() => setLoading(false));
  //   }, [movieId]);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "1dd5db15c141fa804e026f3ccbe7a215",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);
  return (
    <div>
      <button className={css.button}>
        <GoArrowLeft className={css.icon} />
        Go back
      </button>
      {movieDetails && (
        <div>
          <p>{movieDetails.poster_path}</p>
          <p>{movieDetails.title}</p>
          <p>User score: {movieDetails.popularity}%</p>
          <p>Overview</p>
          <p>{movieDetails.overview}</p>
          <p>Genres</p>
          <p>{movieDetails.genres}</p>
        </div>
      )}
      {/* {loading && <b>No info. Try again...</b>} */}
      {/* {movieDetails && <MoviesPage movieDetails={movieDetails} />} */}
    </div>
  );
}

import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";
import { Link, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import MovieCast from "../../components/MovieCast/MovieCast";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

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
        <div className={css.div}>
          <ul className={css.image}>
            <li>
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt="{movieDetails.original_title}"
              />
            </li>
          </ul>
          <ul className={css.list}>
            <li className={css.title}>
              {movieDetails.title} ({movieDetails.release_date.split("-")[0]})
            </li>
            <li className={css.userScore}>
              User score: {Math.round(movieDetails.vote_average * 10)}%
            </li>
            <li className={css.overview}>Overview</li>
            <li>{movieDetails.overview}</li>
            <li className={css.genres}>Genres</li>
            <ul className={css.genresList}>
              {movieDetails.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </ul>
        </div>
      )}
      <div className={css.listAdditionalInfo}>
        <li className={css.additionalInfo}>Additional information</li>
        <nav className={css.navLink}>
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
        </nav>
      </div>

      <Outlet />
      {/* {loading && <b>No info. Try again...</b>} */}
    </div>
  );
}

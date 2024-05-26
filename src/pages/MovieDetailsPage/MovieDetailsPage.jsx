import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import css from "./MovieDetailsPage.module.css";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
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
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Link to={backLinkRef.current}>
        <button className={css.button}>
          <GoArrowLeft className={css.icon} />
          Go back
        </button>
      </Link>

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
          <NavLink to="cast" state={backLinkRef.current}>
            Cast
          </NavLink>
          <NavLink to="reviews" state={backLinkRef.current}>
            Reviews
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

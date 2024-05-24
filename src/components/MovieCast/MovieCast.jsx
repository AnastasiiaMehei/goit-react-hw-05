import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import { ErrorMessage } from "formik";
export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: {
              api_key: "1dd5db15c141fa804e026f3ccbe7a215",
            },
          }
        );
        setMovieCast(response.data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieCast();
    }
  }, [movieId]);

  return (
    <div className={css.divMovieCast}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieCast.map((actor) => (
        <div className={css.actor} key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </div>
      ))}
    </div>
  );
}

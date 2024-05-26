import { useRef } from "react";
import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={backLinkRef}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

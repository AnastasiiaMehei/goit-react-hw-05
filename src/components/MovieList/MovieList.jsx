import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link state={location} to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

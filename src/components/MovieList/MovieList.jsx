import { Link } from "react-router-dom";

export default function MovieList({ movies, id }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${id}`}>Go to movie details</Link>
        </li>
      ))}
    </ul>
  );
}

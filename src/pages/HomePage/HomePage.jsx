import css from "./HomePage.module.css";
import { useState, useEffect } from "react";
import getMovies from "../../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getMovies()
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      {loading && <b>No info. Try again...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

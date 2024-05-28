import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: inputValue });
    setShowResults(true);
  };

  useEffect(() => {
    const searchMovie = searchParams.get("query");
    if (!searchMovie) return;

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "1dd5db15c141fa804e026f3ccbe7a215",
              query: searchMovie,
            },
          }
        );
        setFilteredMovies(response.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [searchParams]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <form onSubmit={handleSearchSubmit}>
        <div className={css.div}>
          <input
            className={css.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </div>
      </form>
      <MovieList movies={filteredMovies} />
    </div>
  );
}

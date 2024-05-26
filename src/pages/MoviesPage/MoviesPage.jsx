import axios from "axios";
import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useLocation } from "react-router-dom";

export default function MoviesPage() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState(location.state?.search || "");
  const [searchMovie, setSearchMovie] = useState(location.state?.search || "");
  const [filteredMovies, setFilteredMovies] = useState(
    location.state?.movies || []
  );
  const [showResults, setShowResults] = useState(!!location.state?.movies);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchMovie(inputValue);
    setShowResults(true);
  };

  useEffect(() => {
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
    if (searchMovie.trim()) {
      searchMovies();
    }
  }, [searchMovie]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className={css.div}>
        <input
          className={css.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={css.button} onClick={handleSearchClick}>
          Search
        </button>
      </div>
      {showResults && <MovieList movies={filteredMovies} />}
    </div>
  );
}

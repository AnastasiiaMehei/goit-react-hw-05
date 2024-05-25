import axios from "axios";
import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import { ErrorMessage } from "formik";
export default function MoviesPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
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
      {showResults && <MovieList movies={filteredMovies} />}{" "}
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import SearchMovies from "../SearchMovies/SearchMovies";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        setMovies([]);
        return;
      }
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "1dd5db15c141fa804e026f3ccbe7a215",
              query,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    searchMovies();
  }, [query]);
  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <SearchMovies />
      <MovieList movies={movies} />
    </div>
  );
}

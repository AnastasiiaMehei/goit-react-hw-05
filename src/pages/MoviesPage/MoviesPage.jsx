import axios from "axios";
import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import { ErrorMessage } from "formik";
export default function MoviesPage() {
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button className={css.button}>Search</button>
      </div>
      <div>
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            {/* <Link to="/movies/:movieId" />
            <Outlet /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

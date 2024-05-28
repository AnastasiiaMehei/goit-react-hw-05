// import { useEffect, useState } from "react"
// import { useSearchParams } from "react-router-dom";

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get("query") ?? "";

//   useEffect(() => {
//     // if (query === "") return;
//     const searchMovies = async () => {
//       if (!query) {
//         setMovies([]);
//         return;
//       }
//       try {
//         setIsLoading(true);
//         setIsError(false);
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/search/movie`,
//           {
//             params: {
//               api_key: "1dd5db15c141fa804e026f3ccbe7a215",
//             },
//           }
//         );
//         setMovies(response);
//       } catch (error) {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     searchMovies();
//   }, [query]);

//   return (
//     <div>

//       <SearchMovies />
//       {<MovieList movies={movies} />}
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import SearchMovies from "../SearchMovies/SearchMovies";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setMovies(response);
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

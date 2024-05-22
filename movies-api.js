import axios from "axios";
axios.defaults.baseURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=en-US&page=1";
const getMovies = async () => {
  const response = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGQ1ZGIxNWMxNDFmYTgwNGUwMjZmM2NjYmU3YTIxNSIsInN1YiI6IjY2NGRkNWYwNTg1ZDU0NDNhMjYzOTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sk4b0T0CzGsfgq4lgFbXsKROMLQ9iboWwXr1u1BjiCA",
    },
  };
  return response.data;
};
export default getMovies;

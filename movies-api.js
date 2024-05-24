import axios from "axios";

const getMovies = async () => {
  try {
    const response = await axios({
      url: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&language=en-US&page=1",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGQ1ZGIxNWMxNDFmYTgwNGUwMjZmM2NjYmU3YTIxNSIsInN1YiI6IjY2NGRkNWYwNTg1ZDU0NDNhMjYzOTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sk4b0T0CzGsfgq4lgFbXsKROMLQ9iboWwXr1u1BjiCA",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export default getMovies;

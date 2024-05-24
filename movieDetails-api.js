// import axios from "axios";

// const getMoviesDetails = async (movieId) => {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: `https://api.themoviedb.org/3/movie/${movieId}`,
//       headers: {
//         accept: "application/json",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGQ1ZGIxNWMxNDFmYTgwNGUwMjZmM2NjYmU3YTIxNSIsInN1YiI6IjY2NGRkNWYwNTg1ZDU0NDNhMjYzOTIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sk4b0T0CzGsfgq4lgFbXsKROMLQ9iboWwXr1u1BjiCA`,
//       },
//     });
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//     throw error;
//   }
// };
// export default getMoviesDetails;

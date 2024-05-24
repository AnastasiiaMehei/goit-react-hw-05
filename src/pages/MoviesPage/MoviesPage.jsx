export default function MoviesPage(movieDetails) {
  return (
    <div>
      <p>{movieDetails.poster_path}</p>
      <p>{movieDetails.title}</p>
      <p>User score: {movieDetails.popularity}%</p>
      <p>Overview</p>
      <p>{movieDetails.overview}</p>
      <p>Genres</p>
      <p>{movieDetails.genres}</p>
    </div>
  );
}

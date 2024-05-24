import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            params: {
              api_key: "1dd5db15c141fa804e026f3ccbe7a215",
            },
          }
        );
        setMovieReviews(response.data.results);
      } catch (error) {
        console.error("Failed to fetch movie reviews:", error);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  return (
    <div>
      {movieReviews?.map((review) => (
        <div className={css.review} key={review.id}>
          <p className={css.p}>Author: {review.author}</p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

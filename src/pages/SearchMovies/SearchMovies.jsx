import { useSearchParams } from "react-router-dom";
import css from "./SearchMovies.module.css";
export default function SearchMovies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.query;
    setSearchParams(input.value ? { q: input.value } : {});
  };

  return (
    <div className={css.div}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          defaultValue={query}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

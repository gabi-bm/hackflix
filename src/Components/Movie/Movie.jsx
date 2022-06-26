import "./Movie.css";
import { Link } from "react-router-dom";
import imgFallback from "../../imgFallback.png";

function Movie({ movie }) {
  return (
    <Link to={"/movie/" + movie.id} className="movie-card">
      <img
        className="movie-poster"
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
            : imgFallback
        }
      ></img>
    </Link>
  );
}

export default Movie;

// {
//   movie.poster_path
//     ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
//     : "../../imgFallback.png"
// }

import "./Reel.css";

import { useState, useEffect } from "react";
import Movie from "../Movie/Movie";
import axios from "axios";

function Reel({ genres, apiPath }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const apiKey = "a4fa608e49f57abf097b835bed2778b5";
    const response = await axios.get(
      `https://api.themoviedb.org/3${apiPath}?api_key=${apiKey}&with_genres=${genres}`
    );
    return response.data.results;
  };

  useEffect(() => {
    const initiateContent = async () => {
      const initialMovies = await getMovies(1);
      setMovies([...initialMovies]);
    };

    initiateContent();
  }, []);

  return (
    <div className="movie-chart-list">
      {movies.map((movie) => {
        return (
          <div className="reel-card" key={movie.id}>
            <Movie key={movie.id} movie={movie} />
          </div>
        );
      })}
    </div>
  );
}

export default Reel;

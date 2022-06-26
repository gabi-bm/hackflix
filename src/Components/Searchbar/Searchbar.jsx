import { useState } from "react";
import axios from "axios";
import "./Searchbar.css";
import imgFallback from "../../imgFallback.png";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Searchbar() {
  const [movies, setMovies] = useState(null);
  const [value, setValue] = useState("");
  const [expand, setExpand] = useState(false);

  const getSearchMovies = async (query) => {
    if (!query) {
      setMovies([]);
    }
    const apiKey = "a4fa608e49f57abf097b835bed2778b5";
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    setMovies(response.data.results);
  };

  if (!expand) {
    return (
      <FontAwesomeIcon
        style={{ color: "white" }}
        icon={faMagnifyingGlass}
        onClick={() => setExpand(true)}
        className="lupa"
      />
    );
  }

  return (
    <div className="search-div">
      <InputGroup>
        <InputGroup.Text
          style={{
            backgroundColor: "rgba(188, 183, 186, 0.21)",
            height: "2rem",
          }}
          id="basic-addon1"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text>
        <Form.Control
          style={{
            backgroundColor: "rgba(188, 183, 186, 0.21)",
            color: "white",
            height: "2rem",
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            getSearchMovies(e.target.value);
          }}
          onFocus={() => setExpand(true)}
          onBlur={() => setExpand(false)}
          placeholder="Quick search..."
          aria-label="Quick search..."
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      {expand && movies && value && (
        <div className="search-list-container">
          <ul className="search-list px-2">
            {movies.map((movie) => {
              return (
                <li key={movie.id}>
                  <Link
                    to={"/movie/" + movie.id}
                    className="d-flex search-movie-div py-2"
                  >
                    <img
                      className="search-img"
                      src={
                        movie.poster_path
                          ? "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                          : imgFallback
                      }
                    ></img>
                    <span className="search-movie-title ps-2">
                      {movie.original_title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Searchbar;

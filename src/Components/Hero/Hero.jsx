import "./Hero.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  const [popMovies, setPopMovies] = useState([]);

  useEffect(() => {
    const getPopMovies = async () => {
      const apiKey = "a4fa608e49f57abf097b835bed2778b5";
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      setPopMovies(response.data.results.slice(0, 5));
    };

    getPopMovies();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Carousel
        className="hero carousel-container"
        style={{ position: "relative" }}
      >
        {popMovies.map((movie) => {
          return (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block img-fluid"
                src={
                  "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                }
                alt="First slide"
              />
              <Carousel.Caption
                className="hero-text"
                id="carousel-caption-custom"
              >
                <span className="hx-logo py-0">
                  H<small>ackflix</small>
                </span>
                <span
                  className="mx-2 mb-2 p-1"
                  style={{
                    backgroundColor: "rgba(33, 37, 41, 0.75)",
                    borderRadius: "5px",
                  }}
                >
                  Premiere
                </span>
                <h2>{movie.original_title}</h2>
                <p>{movie.overview}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <FontAwesomeIcon
        className="arrow-down arrow-down-left"
        icon={faArrowDown}
      />
      <FontAwesomeIcon
        className="arrow-down arrow-down-right"
        icon={faArrowDown}
      />
    </div>
  );
}

export default Hero;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./MoviePage.css";

import NotFound from "../NotFound/NotFound";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

function MoviePage() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const apiKey = "a4fa608e49f57abf097b835bed2778b5";
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`
        );
        setMovie(response.data);
      } catch (err) {
        setError("Sorry, we couldn't find that movie :(");
      }
    };
    getMovie();
  }, []);

  if (error) {
    return <NotFound message={error} />;
  }
  if (!movie) {
    return (
      <div className="spinner-container">
        <Oval className="spinner" color="#00BFFF" height={80} width={80} />
      </div>
    );
  } else {
    return (
      <div
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <FontAwesomeIcon className="play-icon" icon={faCirclePlay} />
        <div className="movie-hero-footer">
          <Container>
            <Row className="d-flex justify-content-between">
              <Col sm={12} md={7} lg={8} xl={9}>
                <h1 className="movie-hero-title">{movie.original_title}</h1>
                <p>{movie.overview}</p>
              </Col>
              <Col sm={0} md={5} lg={4} xl={3}>
                <div className="movie-icons">
                  <div className="rating pe-4 d-flex flex-column">
                    <span className="icons-title">RATING</span>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faStar} />
                      <span className="vote-average">
                        {movie.vote_average}
                        <small>/ 10</small>
                      </span>
                    </div>
                    <small className="vote-count">
                      {movie.vote_count > 1000 && movie.vote_count / 1000 + "K"}
                    </small>
                  </div>

                  <div className="popularity d-flex flex-column">
                    <span className="icons-title">POPULARITY</span>
                    <div className="d-flex">
                      <FontAwesomeIcon icon={faArrowTrendUp} />
                      <span className="popularity-number">
                        {movie.popularity}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <span style={{ fontSize: "0.9rem" }}>Genres:</span>
                  <p style={{ fontSize: "0.9rem" }}>
                    {movie.genres.map((genre) => ` ${genre.name}`).toString()}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default MoviePage;

import "./Discover.css";
import { useState, useEffect } from "react";
import Movie from "../../Components/Movie/Movie";
import Rating from "../../Components/Rating/Rating";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Discover() {
  const [movies, setMovies] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const [filledStars, setFilledStars] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = "a4fa608e49f57abf097b835bed2778b5";

  const getDefaultMovies = async (page) => {
    console.log("Fetching default movies...");
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
    );
    console.log(response.data);
    setMovies((prevState) => [...prevState, ...response.data.results]);
    setApiPage((prevState) => prevState + 1);
  };

  const getMoviesByRating = async (page, stars) => {
    console.log("Fetching by rating...");
    const minVoteAverage = 2 * (stars - 1);
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&vote_average.gte=${minVoteAverage}`
    );
    console.log(response.data);
    setMovies((prevState) => [...prevState, ...response.data.results]);
    setApiPage((prevState) => prevState + 1);
  };

  const filterMoviesByRating = (stars) => {
    setMovies([]);
    setFilledStars(stars);
    getMoviesByRating(1, stars);
  };

  const resetFilters = () => {
    setFilledStars(0);
    setApiPage(1);
    setMovies([]);
    getDefaultMovies(1);
  };

  useEffect(() => {
    const initiateContent = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`
      );
      console.log(response.data);
      setMovies(response.data.results);
      setApiPage(2);
    };
    initiateContent();
  }, []);

  return (
    <Container className="discover-container">
      <Row className="pt-5" style={{ height: "90%" }}>
        <Col lg={4} className="border">
          <Rating
            filledStars={filledStars}
            filterMoviesByRating={filterMoviesByRating}
            resetFilters={resetFilters}
          />
        </Col>
        <Col
          lg={8}
          id="discover-chart"
          className="border"
          style={{ height: "100%", overflowY: "scroll" }}
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={() => {
              if (filledStars > 0) {
                getMoviesByRating(apiPage, filledStars);
                return;
              }
              getDefaultMovies(apiPage);
            }}
            hasMore={apiPage <= 5 ? true : false}
            loader={<h4 style={{ color: "white" }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b style={{ color: "white" }}>No more movies to show :(</b>
              </p>
            }
            scrollableTarget="discover-chart"
          >
            <div className="d-flex flex-wrap justify-content-around">
              {movies.map((movie) => {
                return (
                  <div
                    key={uuidv4()}
                    className="movie-discover-card movie-poster m-3"
                  >
                    <Movie movie={movie} />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

export default Discover;

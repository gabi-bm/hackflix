import "./Discover.css";
import { useState, useEffect } from "react";
import Movie from "../../Components/Movie/Movie";
import Rating from "../../Components/Rating/Rating";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
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

  const getMoviesByQueryChange = async (page, query) => {
    console.log("Fetching by title...");
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${query}`
    );
    setMovies(response.data.results);
  };

  const getMoviesByQueryScroll = async (page, query) => {
    console.log("Fetching by title...");
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${query}`
    );
    console.log(response.data);
    setMovies((prevState) => [prevState, ...response.data.results]);
    setApiPage((prevState) => prevState + 1);
  };

  const filterMoviesByRating = async (stars) => {
    setMovies([]);
    setApiPage(1);
    setFilledStars(stars);
    getMoviesByRating(1, stars);
  };

  const resetFilters = () => {};

  const loader =
    filledStars || searchQuery ? "Loading..." : "No filter aplied yet";

  return (
    <Container className="discover-container">
      <Row className="pt-5" style={{ height: "90%" }}>
        <Col
          xs={4}
          sm={4}
          lg={4}
          className="shadow-lg"
          style={{ height: "100%" }}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control
              value={searchQuery}
              onFocus={() => {
                setMovies([]);
                setApiPage(1);
              }}
              onBlur={() => {
                setSearchQuery("");
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                getMoviesByQueryChange(apiPage, e.target.value);
              }}
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Rating
            filledStars={filledStars}
            filterMoviesByRating={filterMoviesByRating}
            resetFilters={resetFilters}
          />
          {movies && (
            <div className="mt-3" style={{ height: "80%", overflow: "scroll" }}>
              <ul className="titles-list px-0">
                {movies.map((movie) => {
                  return (
                    <Link to={"/movie/" + movie.id} key={uuidv4()}>
                      <li>{movie.original_title}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </Col>
        <Col
          xs={8}
          sm={8}
          lg={8}
          id="discover-chart"
          className="shadow-lg"
          style={{ height: "100%", overflowY: "scroll" }}
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={() => {
              if (searchQuery) {
                getMoviesByQueryScroll(apiPage, searchQuery);
                return;
              }
              getMoviesByRating(apiPage, filledStars);
            }}
            hasMore={apiPage <= 5 ? true : false}
            loader={<h4 style={{ color: "white" }}>{loader}</h4>}
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

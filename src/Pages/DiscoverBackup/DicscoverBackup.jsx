import "./Discover.css";

import { useState, useEffect } from "react";
import Movie from "../../Components/Movie/Movie";
import Rating from "../../Components/Rating/Rating";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
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

  const getMovies = async (page) => {
    console.log("getMovies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`
    );
    setMovies([...movies, ...response.data.results]);
  };

  // const getMoviesByQuery = async (page, query) => {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${query}`
  //   );
  //   setMovies((prevState) => [...prevState, ...response.data.results]);
  // };

  // const getMoviesByRating = async (page, filledStars) => {
  //   const minVoteAverage = 2 * (filledStars - 1);
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&vote_average.gte=${minVoteAverage}`
  //   );
  //   setMovies((prevState) => [...prevState, ...response.data.results]);
  // };

  // const addMovies = async (page) => {
  //   if (searchQuery) {
  //     getMoviesByQuery();
  //   } else if (filledStars) {
  //     getMoviesByRating();
  //   } else {
  //     getMovies();
  //   }
  //   setApiPage((prevState) => prevState + 1);
  // };

  // const filterMovies = (stars) => {
  //   setApiPage(1);
  //   setFilledStars(stars);
  //   getMoviesByRating(apiPage, filledStars);
  // };

  // const resetFilters = () => {
  //   setFilledStars(0);
  // };

  useEffect(() => {
    const initiateContent = async () => {
      getMovies(1);
      setApiPage(2);
    };
    initiateContent();
  }, []);

  return (
    <Container className="discover-container">
      <Row className="pt-4">
        {/* <Col sm={10} md={10} lg={4} xl={4} className="pt-4 pe-5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </InputGroup.Text>
            <Form.Control
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setApiPage(1);
                getMoviesByQuery(apiPage, e.target.value);
              }}
              placeholder="Search..."
              aria-label="Search..."
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Rating
            filledStars={filledStars}
            filterMovies={filterMovies}
            resetFilters={resetFilters}
          />
          {movies && (
            <div
              className="mt-3"
              style={{ height: "20rem", overflow: "scroll" }}
            >
              <ul className="titles-list">
                {movies.map((movie) => {
                  return <li key={movie.id}>{movie.original_title}</li>;
                })}
              </ul>
            </div>
          )}
        </Col> */}
        <Col
          sm={2}
          md={2}
          lg={8}
          xl={8}
          className="px-0"
          style={{ maxHeight: "5rem" }}
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={() => console.log("ok")}
            hasMore={apiPage <= 5 ? true : false}
            loader={<h4 style={{ color: "white" }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more movies to show :(</b>
              </p>
            }
            style={{ width: "100%" }}
          >
            <Row
              className="gx-0"
              style={{ maxHeight: "28rem", height: "80vh" }}
            >
              {movies.map((movie) => {
                return (
                  <Col
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    key={movie.id}
                    className="p-3"
                  >
                    <Movie movie={movie} />
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}

export default Discover;

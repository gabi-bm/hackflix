import "./TitleSearchPage.css";
import { useState, useEffect } from "react";
import Movie from "../../Components/Movie/Movie";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Input } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function TitleSearchPage() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiPage, setApiPage] = useState(1);
  const apiKey = "a4fa608e49f57abf097b835bed2778b5";
  let loader = searchQuery ? "Loading..." : "Search by title!";

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );
      setMovies(response.data.results);
    };
    getMovies();
    setApiPage(2);
  }, [searchQuery]);

  const addMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${apiPage}`
    );
    setMovies([...movies, ...response.data.results]);
    setApiPage(apiPage + 1);
  };

  return (
    <Container
      className="d-flex flex-column align-items-center my-3"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <InputGroup className="my-3" style={{ width: "20rem" }}>
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </InputGroup.Text>
        <Form.Control
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => addMovies()}
        hasMore={apiPage < 50 ? true : false}
        loader={
          <h4 style={{ color: "white", alignSelf: "center" }}>{loader}</h4>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b style={{ color: "white" }}>No more movies to show :(</b>
          </p>
        }
        scrollableTarget="scrollableDiv"
        className="d-flex flex-wrap justify-content-between my-3"
      >
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="discover-card movie-poster m-3">
              <Movie movie={movie} />
            </div>
          );
        })}
      </InfiniteScroll>
    </Container>
  );
}

export default TitleSearchPage;

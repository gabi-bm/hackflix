import "./RatingSearchPage.css";
import Movie from "../../Components/Movie/Movie";
import Rating from "../../Components/Rating/Rating";

import axios from "axios";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import InfiniteScroll from "react-infinite-scroll-component";

function RatingSearchPage() {
  const [movies, setMovies] = useState([]);
  const [filledStars, setFilledStars] = useState(0);
  const [apiPage, setApiPage] = useState(1);
  const apiKey = "a4fa608e49f57abf097b835bed2778b5";

  console.log("me estoy consologueando desde EL COMPOOOO");

  const filterMoviesByRating = (stars) => {
    setFilledStars(stars);
  };

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&vote_average.gte=${
          2 * (filledStars - 1)
        }`
      );
      setMovies(response.data.results);
    };
    getMovies();
    setApiPage(2);
  }, [filledStars]);

  const addMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&vote_average.gte=${
        2 * (filledStars - 1)
      }&page=${apiPage}`
    );
    setMovies([...movies, ...response.data.results]);
    setApiPage(apiPage + 1);
  };

  return (
    <Container
      className="d-flex flex-column align-items-center my-3"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Rating
        filterMoviesByRating={filterMoviesByRating}
        filledStars={filledStars}
      />
      <InfiniteScroll
        dataLength={movies.length}
        next={() => addMovies()}
        hasMore={apiPage < 50 ? true : false}
        loader={
          <h4 style={{ color: "white", alignSelf: "center" }}>Loading...</h4>
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

export default RatingSearchPage;

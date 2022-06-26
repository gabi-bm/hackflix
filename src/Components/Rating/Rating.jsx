import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { faStar } from "@fortawesome/free-regular-svg-icons";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import "./Rating.css";

function Rating({ filterMoviesByRating, filledStars }) {
  const numOfStars = [1, 2, 3, 4, 5];

  console.log(
    `estoy consologueandome desde rating, y filledStars vale... ${filledStars}`
  );
  return (
    <div
      style={{ width: "16rem" }}
      className="d-flex flex-column align-items-center justify-content-between"
    >
      <span className="filter-text" style={{ fontSize: "1.3rem" }}>
        Filter by rate
      </span>
      <ul className="stars-ul">
        {numOfStars.map((stars) => {
          return (
            <li
              className={stars <= filledStars ? "filled-star" : undefined}
              key={stars}
              onClick={() => {
                filterMoviesByRating(stars);
              }}
            >
              <FontAwesomeIcon icon={faStar} />
            </li>
          );
        })}
      </ul>
      {/* <Button
        variant="light"
        style={{ padding: 0 }}
        onClick={() => resetFilters()}
      >
        Reset
      </Button> */}
    </div>
  );
}

export default Rating;

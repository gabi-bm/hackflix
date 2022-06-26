import "./Chart.css";
import Reel from "../Reel/Reel";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function Chart() {
  return (
    <Container className="mt-5">
      <div>
        <h3>Popular</h3>
        <Reel apiPath="/movie/popular" />
      </div>
      <div>
        <h3>Top Rated</h3>
        <Reel apiPath="/movie/top_rated" />
      </div>
      <div>
        <h3>Drama</h3>
        <Reel genres="18" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Documentary</h3>
        <Reel genres="99" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Thriller</h3>
        <Reel genres="53" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Comedy</h3>
        <Reel genres="35" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>History</h3>
        <Reel genres="36" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Music</h3>
        <Reel genres="10402" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Animation</h3>
        <Reel genres="16" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Action</h3>
        <Reel genres="28" apiPath="/discover/movie" />
      </div>
      <div>
        <h3>Crime</h3>
        <Reel genres="80" apiPath="/discover/movie" />
      </div>
    </Container>
  );
}

export default Chart;

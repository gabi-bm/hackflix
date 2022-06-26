// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";

function CustomModal({ showModal, selectedMovie, handleCloseModal }) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      dialogClassName="modal-60w"
    >
      <Modal.Header closeButton>
        <Modal.Title>{showModal && selectedMovie.original_title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-div-custom">
          {showModal && (
            <div className="modal-text">
              <div className="modal-icons">
                <div className="rating">
                  <FontAwesomeIcon icon={faStar} />
                  <span>{selectedMovie.vote_average}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faStar} />
                  <span>{selectedMovie.vote_count}</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                  <span>{selectedMovie.popularity}</span>
                </div>
              </div>
              <div className="overview">
                <span>Overview</span>
                <p>{selectedMovie.overview}</p>
              </div>
            </div>
          )}
          {showModal && <img src={selectedMovie.poster_path}></img>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;

// "id": 414906,
// "original_language": "en",
// "original_title": "The Batman",
// "overview": "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.",
// "popularity": 3006.855,
// "poster_path": "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
// "release_date": "2022-03-01",
// "title": "The Batman",
// "vote_average": 7.8,
// "vote_count": 4897

import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavDropdown } from "react-bootstrap";
import pattern from "../../navPattern2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";

function CustomNavbar() {
  return (
    <div
      style={{
        backgroundImage: "url(" + pattern + ")",
      }}
    >
      <Navbar
        style={{
          backgroundColor: "rgba(33, 37, 41, 0.97)",
          zIndex: 2,
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faVideo} />
            <span className="ms-2">Hackflix</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: "end" }}>
            <Nav className="d-flex justify-content-between align-items-center w-100">
              <div className="d-flex align-items-center">
                <Link
                  to="/"
                  className="mx-2"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Home
                </Link>
                <NavDropdown
                  title="Discover"
                  className="mx-3"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#">
                    <Link
                      to="/discover/rating"
                      style={{
                        textDecoration: "none",
                        color: "rgba(33, 37, 41, 0.97)",
                      }}
                    >
                      Search movies by rating
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item href="#">
                    <Link
                      to="/discover/title"
                      style={{
                        textDecoration: "none",
                        color: "rgba(33, 37, 41, 0.97)",
                      }}
                    >
                      Search movies by title
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <Searchbar />
              </div>
              <div>
                <Link
                  to="/about-us"
                  className="mx-3"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  About us
                </Link>
                <Link
                  to="/contact"
                  className="ms-3"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Contact
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;

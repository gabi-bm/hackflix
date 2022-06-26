import "./Footer.css";
import pattern from "../../navPattern2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <div
      style={{ backgroundImage: "url(" + pattern + ")", height: "8rem" }}
      className="footer"
    >
      <div
        style={{
          height: "8rem",
          backgroundColor: "rgba(33, 37, 41, 0.97)",
          zIndex: 2,
        }}
      >
        <Container className="footer-container">
          <div>Iconos</div>
          <div>Links</div>
          <div>© 2022 Copyright: Hackflix..... </div>
        </Container>
      </div>
    </div>
  );
}

export default Footer;

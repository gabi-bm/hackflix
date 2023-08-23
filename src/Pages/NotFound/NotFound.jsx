import notFound from "../../notFound2.jpg";
import "./NotFound.css";

function NotFound({ message }) {
  return (
    <div
      className="not-found-container"
      style={{ backgroundImage: "url(" + notFound + ")" }}
    >
      <h1>{message}</h1>
      <span>1</span>
      <p>PRobando tomate</p>
    </div>
  );
}

export default NotFound;

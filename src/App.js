import "./App.css";

import useIsOnline from "./Hooks/useIsOnline";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import MoviePage from "./Pages/MoviePage/MoviePage";
import Discover from "./Pages/DiscoverBackup/Discover";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import NotFound from "./Pages/NotFound/NotFound";
import RatingSearchPage from "./Pages/RatingSearchPage/RatingSearchPage";
import TitleSearchPage from "./Pages/TitleSearchPage/TitleSearchPage";

function App() {
  const isOnline = useIsOnline();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
        <Route path="/discover/rating" element={<RatingSearchPage />}></Route>
        <Route path="/discover/title" element={<TitleSearchPage />}></Route>
        <Route path="/about-us" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="*"
          element={<NotFound message={"404 - Not Found"} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

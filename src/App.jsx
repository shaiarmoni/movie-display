import "./App.css";

import Movies from "./pages/Movies/Movies";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/Movies/MovieDetails";
import Shows from "./pages/Shows/Shows";
import ShowDetails from "./pages/Shows/ShowDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/shows/:showId" element={<ShowDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

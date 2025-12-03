import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className="navigation-link">
        Home
      </NavLink>{" "}
      <NavLink to="/movies" className="navigation-link">
        Movies
      </NavLink>{" "}
      <NavLink to="/shows" className="navigation-link">
        Shows
      </NavLink>
    </nav>
  );
}
export default Navbar;

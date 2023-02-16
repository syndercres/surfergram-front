import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function NavBar(): JSX.Element {
  return (
    <div>
      <div className="nav-container">
        <h1>Surfergram</h1>
        <div className="nav-links">
          <NavLink to="">
            <button className="nav-button">spots</button>
          </NavLink>

          <NavLink to="/add-spot">
            <button className="nav-button">add a spot </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <div>
      <h1>nav time!</h1>
      <NavLink to="/add-spot" className="navbarAddresource navitem">
        Add Resource!
      </NavLink>
    </div>
  );
}

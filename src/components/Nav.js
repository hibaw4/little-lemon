import { Link } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <h1 className="logo">Little Lemon</h1>
      <ul className="nav-links" role="menubar" aria-label="Primary navigation menu">
        <li role="none">
          <Link to="/" role="menuitem" aria-label="Home page">Home</Link>
        </li>
        <li role="none">
          <Link to="/booking" role="menuitem" aria-label="Make a reservation">Reserve</Link>
        </li>
        <li role="none">
          <a href="/menu" role="menuitem" aria-label="View our menu">Menu</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
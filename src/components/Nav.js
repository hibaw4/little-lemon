import { Link } from "react-router-dom";
import "../App.css"; // optional if you want separate CSS

function Nav() {
  return (
    <nav className="nav-bar">
      <h1 className="logo">Little Lemon</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/booking">Reserve</Link></li>
        <li><a href="/menu">Menu</a></li>
      </ul>
    </nav>
  );
}

export default Nav;

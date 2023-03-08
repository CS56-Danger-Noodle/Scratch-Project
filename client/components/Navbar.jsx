import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar (props) {
  return (
    <nav className="navbar">
      <ul className="navlist">
        {/* <NavLink to='/signup'>SignUp</NavLink> */}
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/boards">Boards</Link></li>
        <li><Link to="/">Home</Link></li>
      </ul>
    </nav>
  );
}
export default Navbar;
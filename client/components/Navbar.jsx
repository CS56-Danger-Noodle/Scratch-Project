import React from "react";
import { NavLink } from "react-router-dom";

function Navbar ({ user }) {
  return (
    <div className="navbarContainer">
      <nav className="navbar">
        <ul className="navlist">
          {!user && <li><NavLink to="/login">Login</NavLink></li>}
          {!user && <li><NavLink to="/signup">Sign up</NavLink></li>}
          {user && <li><NavLink to="/boards">My Boards</NavLink></li>}
        </ul>
        {user && <h1 className="navbarTitle">welcome {user.username}</h1>}
        {user && <button className="logOut" onClick={() => (console.log('logging out user: ', user.username))}>LOG OUT</button>}
      </nav>
    </div>
  );
}
export default Navbar;
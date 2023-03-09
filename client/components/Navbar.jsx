import React from "react";
import { NavLink } from "react-router-dom";

function Navbar ({ user }) {
  return (
    <div className="navbarContainer">
      <nav className="navbar">
        <ul className="navlist">
          {/* <NavLink to='/signup'>SignUp</NavLink> */}
          {!user && <li><NavLink to="/login">Login</NavLink></li>}
          {!user && <li><NavLink to="/signup">Sign up</NavLink></li>}
          {user && <li><NavLink to="/boards">Boards '/boards'</NavLink></li>}
          {user && <li><NavLink to="/">Home '/'</NavLink></li>}
        </ul>
        {user && <h1 className="navbarTitle">welcome {user.username}</h1>}
        {user && <button className="logOut" onClick={() => (console.log('logging out user: ', user))}>LOG OUT</button>}
      </nav>
    </div>
  );
}
export default Navbar;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Navbar ({ user, setUser }) {


  const navigate = useNavigate();

  async function logout() {
    console.log('logging out');
    try {
      // make DB call to terminate session
      await axios.delete('/logout');
      // clear userState
      setUser(null);
      // navigate to login page
      navigate('/login');
    } catch(err) {
      console.log('error in BoardPage.jsx logout function: ', err.message)
    }
  }

  return (
    <div className="navbarContainer">
      <nav className="navbar">
        <ul className="navlist">
          {!user && <li><NavLink to="/login">Login</NavLink></li>}
          {!user && <li><NavLink to="/signup">Sign up</NavLink></li>}
          {user && <li><NavLink to="/boards">My Boards</NavLink></li>}
          {user && <li><NavLink to="/boards/640635f9e846af21bdd5652e">Boardpage</NavLink></li>}
        </ul>
        {user && <h1 className="navbarTitle">welcome {user.username}</h1>}
        {user && <button className="logOut" onClick={logout}>LOG OUT</button>}
      </nav>
    </div>
  );
}
export default Navbar;
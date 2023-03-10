import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Navbar from './components/Navbar.jsx';
import BoardsPage from './pages/BoardsPage.jsx';
import BoardPage from './pages/BoardPage.jsx';


const App = () => {
  const [user, setUser] = useState(null); // refactor to add useEffect here that checks for user in session

  return (

    <>
      <Router>
        <Navbar
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route
            path='/'
            element={
              user ?
                <BoardsPage
                  user={user}
                /> :
                <LoginPage
                  user={user}
                  setUser={setUser}
                />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUpPage
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route
            path='/boards'
            element={
              user ?
                <BoardsPage
                  user={user}
                /> :
                <LoginPage
                  user={user}
                  setUser={setUser}
                />
            }
          />
          <Route
            path='/boards/:board_id'
            element={
              <BoardPage
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

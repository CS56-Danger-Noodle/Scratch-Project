import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import BoardsPage from './pages/BoardsPage.jsx';
import BoardPage from './pages/BoardPage.jsx';


const App = () => {
  // const [ loginError, setLoginError] = useState(false);
  const [user, setUser] = useState(null); // refactor to add useEffect here that checks for user in session

  //Refactor Login Errors
  // useEffect(() => {
  //   if (loginError === true) alert('Incorrect username or password. Please try again');
  // }, [loginError])

  return (

    <>
      <Router>
        <Routes>
          <Route
            path="/"
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
              <BoardsPage
                user={user}
              />
            }
          />
          <Route
            path='/boards/:board_id'
            element={
              <BoardPage
                user={user}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

/*notes on the routing:
//the first Route has a path of "/" (which maybe should change?)
// and it renders the Login Page
//the next Routes are nested in that first Route

// do we need to add a catchall for undefined URLs, like <Route path="*" element={<NoPage />} />
// & then import a NoPage & have an error msg?
*/

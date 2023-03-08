import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import Navbar from './components/Navbar.jsx';
import BoardsPage from './pages/BoardsPage.jsx';
import BoardPage from './pages/BoardPage.jsx';


const App = () => {
  // const [ signUpToggle, setSignUpToggle ] = useState(false);
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false); //<--- Switch to false when ready
  const [ loginError, setLoginError] = useState(false);
  const [ user, setUser ] = useState(null); // refactor to add useEffect here that checks for user in session
  


  // //SIGN-UP / SIGN-IN TOGGLE
  // const toggle = () => {
  //   setSignUpToggle(!signUpToggle);
  // }

  useEffect(() => {
    if (loginError === true) alert('Incorrect username or password. Please try again');
  }, [loginError])

  // return (
  //   <>
  //     {isLoggedIn ? (<HomePage user={user} isLoggedIn={isLoggedIn} setLogin={setLogin}/>) :
  //     (signUpToggle ? (
  //       <SignUpPage
  //       user={user}
  //       setUser={setUser}
  //       password={password}
  //       setPassword={setPassword}
  //       toggle={toggle}
  //       isLoggedIn={isLoggedIn}
  //       setLogin={setLogin}
  //     />
  //     ) : (
  //       <LoginPage
  //         user={user}
  //         setUser={setUser}
  //         password={password}
  //         setPassword={setPassword}
  //         toggle={toggle}
  //         isLoggedIn={isLoggedIn}
  //         setLogin={setLogin}
  //         setLoginError={setLoginError}
  //       />
  //     )
  //     )}
  //     {/* {loginError ? (<div>Incorrect username or password. Please try again</div>) : <></>} */}
      
  //   </>
  // );

  return (
    
    <>
    <Router>
      <Navbar />
        <Routes>
        <Route path='/' element={<h1>Home</h1>} />
          <Route 
            path="/login" 
            element={
              <LoginPage
                // toggle={toggle}
                // isLoggedIn={isLoggedIn}
                // setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route 
            path="/signup" 
            element={
              <SignUpPage
                // toggle={toggle}
                // isLoggedIn={isLoggedIn}
                // setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route 
            path='/boards'      // '/boards/id'  ????  eventually '/boards' could list all boards and '/boards/id' would make request and serve a specific board
            element={
              <BoardPage
                user={user}
              />
            } 
          />
          <Route 
            path='/boards/id'
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


/*
Routing:
<SignUpPage />
<LoginPage />
<HomePage />

<Router>
  <Routes>
    <Route 
      path="/login" 
      element={
        <LoginPage
          user={user}
          setUser={setUser}
          password={password}
          setPassword={setPassword}
          toggle={toggle}
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
        />
      }
    />
    <Route 
      path="/signup" 
      element={
        <SignUpPage
          user={user}
          setUser={setUser}
          password={password}
          setPassword={setPassword}
          toggle={toggle}
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
        />
      }
    />
    <Route 
      path='/boards'      // '/boards/id'  ????  eventually '/boards' could list all boards and '/boards/id' would make request and serve a specific board
      element={
        <BoardsPage
        />
      } 
    />
    <Route 
      path='/boards/id'
      element={
        <BoardPage
      }
  </Routes>
</Router>

*/

/* tried useContext() 
  const [signUpToggle, setSignUpToggle]= useContext(UserProvider)
  console.log('SIGNUPTOGGLE from app: ',signUpToggle)
  console.log('UserProvider from APP.jsx', UserProvider)
*/

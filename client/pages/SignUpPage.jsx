import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// NOT TESTED, TEST OUT

function SignUpPage ({toggle, isLoggedIn, setIsLoggedIn}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState(''); //<-- Switch to an empty string when ready
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {username: username, password: password}
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    }).then((res) => {
      setIsLoggedIn(true);
      console.log('user created and logged in on signuppage.jsx')
    }). catch((error) => {
      console.log('unable to signup user', error)
    })
  }
  
  //RENDER
  return (
    <div className='loginCont'>
      <div className="user-login-box">
          <h1 className='login-header'>Create a new Account:</h1>
          <form className='loginForm' onSubmit={handleSubmit}>
              <div className='formLine'>
                <label className='login-text' htmlFor="username">Username/Email</label>
                <input className='user-input' type='text' value={username} required onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className='formLine'>
                <label className='login-text' htmlFor="password">Password</label>
                <input className='user-input' type='password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button className='submit' >Submit</button>
          </form>
              <div className='login-footer'>
                  Already have an account? <button onClick={() => navigate('/login')}>Sign in here!</button>
              </div>
      </div>
    </div>
  )
}
 
export default SignUpPage;




/* tried useContext ...

import UserProvider from '../UserContext';
import UserContext from '../UserContext';
STATE HERE IF NEEDED
const user = useContext(UserProvider)
const password = useContext(UserProvider)
// const signUpToggle = useContext(UserProvider)
// const setSignUpToggle = useContext(UserProvider)
const [signUpToggle, setSignUpToggle] = useContext(UserContext)


function toggle () {
  console.log('toggle: ', typeof setSignUpToggle)
  console.log(setSignUpToggle)
  return setSignUpToggle(false)

*/ 
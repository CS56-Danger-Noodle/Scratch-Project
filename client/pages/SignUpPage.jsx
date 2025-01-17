import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function SignUpPage({ user, setUser }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const alertRef = useRef();

  const setAlertTextVisible = () => alertRef.current.style.visibility = 'visible';

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username, password }
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    })
      .then(async (res) => {
        const status = res.status;
        const data = await res.json();
        if (status === 200) {
          setUser({ username, board_ids: data.board_ids });
          navigate(`/boards/`);
        } else if (status === 400 && data.err.includes('already exist')) {
          alertRef.current.innerHTML = 'Username already exists.<br />Please select a different username.';
          setAlertTextVisible();
        } else {
          alertRef.current.innerHTML = 'Unable to sign up. Please try again.';
          setAlertTextVisible();
        }
      }).catch((error) => {
        console.log('unable to signup user', error)
      })
  }

  const handleInputChange = ({ target }, callback) => {
    callback(target.value);
    if (alertRef.current.style.visibility === 'visible') alertRef.current.style.visibility = 'hidden';
  }

  //RENDER
  return (
    <div className='loginCont'>
      <div className="user-login-box">
        <header>
          <h1 className='login-header'>Create a new Account:</h1>
          <span className='alert' ref={alertRef}></span>
        </header>
        <form className='loginForm' onSubmit={handleSubmit}>
          <div className='formLine'>
            <label className='login-text' htmlFor="username">Username/Email</label>
            <input className='user-input' type='text' value={username} required onChange={(e) => handleInputChange(e, setUsername)} />
          </div>
          <div className='formLine'>
            <label className='login-text' htmlFor="password">Password</label>
            <input className='user-input' type='password' value={password} required onChange={(e) => handleInputChange(e, setPassword)} />
          </div>
          <button className='submit' >Submit</button>
        </form>
        <div className='login-footer'>
          <span>Don't have an Account?</span>
          <button onClick={() => navigate('/login')}>Sign in here!</button>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
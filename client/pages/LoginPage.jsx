import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

function LoginPage({ user, setUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); //<-- Switch to an empty string when ready
    const [password, setPassword] = useState('');
    const alertRef = useRef();

    //HANDLE LOGIN
    // refactor this later
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = { username, password };
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then((res) => res.json())
        .then(data => {
            console.log('in login, data is: ', data);
            const userData = { user_id: data.user_id, username, board_ids: data.board_ids};  // '640635f9e846af21bdd5652e'
            setUser(userData); // expect a user object with id, username, board array
            // Eventually add this functionality to route to home page displaying all boards
            //navigate('/boards')   // user.board_ids   // getBoards from backend - boardNames and Id
            // for now we just directly go to the first board
            // navigate(`/boards/${userData.board_ids[0]}`);
            navigate(`/boards`);
        }).catch((error) => {
            console.log('incorrect username or password: ', error.message)
        }) 
    }
    //RENDER
    return (
        <div className='loginCont'>
            <div className="user-login-box">
                <header>
                    <h1 className='login-header'>Welcome! Sign in here! </h1>
                    <span id='login-alert' ref={alertRef}>Incorrect username and/or password.</span>
                </header>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className='formLine'>
                        <label className='login-text' htmlFor="username">Username/Email</label>
                        <input className='user-input' type='text' required value={username} onChange={(e) => handleInputChange(e, setUsername)} />
                    </div>
                    <div className='formLine'>
                        <label className='login-text' htmlFor="password">Password</label>
                        <input className='user-input' type='password' value={password} required onChange={(e) => handleInputChange(e, setPassword)} />
                    </div>
                    <button className='submit'>Login</button>
                </form>
                <div className='login-footer'>
                    <span>Don't have an Account?</span>
                    <button onClick={() => navigate('/signup')}>Sign up here!</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;



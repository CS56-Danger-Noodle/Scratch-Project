import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import HomePage from './BoardPage.jsx'
import { Link, useNavigate } from "react-router-dom";

function LoginPage ({user, setUser}) {

    const navigate = useNavigate();
    const [username, setUsername] = useState(''); //<-- Switch to an empty string when ready
    const [password, setPassword] = useState('');

    //HANDLE LOGIN
    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {username, password}
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then((res) => res.json())
        .then(data => {

            const userData = { id: 1, username: 'test', boards: ['640635f9e846af21bdd5652e']};  // '640635f9e846af21bdd5652e'
            setUser(userData); // expect a user object with id, username, board array
            navigate('/boards/640635f9e846af21bdd5652e');
            // if (res.status === 404) {
            //     // setIsLoggedIn(false)
            //     // setLoginError(true)
            //     console.log("404 in handleSubmit");
            // } else {
            //     // setIsLoggedIn(true);   //isLoggedIn true -> useEffect -> fetch to /api for [{board1}]
            //     // setLoginError(false);
            //     // navigate to '/home'
                
            // }
            console.log('logged in on LoginPage.jsx')
            // console.log('users data', user)
        }).catch((error) => {
            console.log('incorrect username or password', error)
        }) 
    }
    //RENDER
    return (
        <div className='loginCont'>
            <div className="user-login-box">
                <h1 className='login-header'>Welcome! Sign in here! </h1>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <div className='formLine'>
                        <label className='login-text' htmlFor="username">Username/Email</label>
                        <input className='user-input' type='text' required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='formLine'>
                        <label className='login-text' htmlFor="password">Password</label>
                        <input className='user-input' type='password' value={password} required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className='submit'>Login</button>
                </form>
                    <div className='login-footer'>
                        Don't have an Account? <button onClick={() => navigate('/signup')}>Sign up here!</button>
                    </div>
            </div>
            {isLoggedIn && <HomePage />} 
        </div>
    )
}
 
export default LoginPage;


/* tried useContext()

import UserProvider from '../UserContext';
import UserContext from '../UserContext';

    const user = useContext(UserProvider)
    const password = useContext(UserProvider)
    const signUpToggle = useContext(UserProvider)
    const setSignUpToggle = useContext(UserProvider)
    const [signUpToggle, setSignUpToggle] = useContext(UserContext)


    function toggle () {
        console.log(setSignUpToggle)
        console.log('toggle: ', typeof setSignUpToggle)
        setSignUpToggle(false)
*/
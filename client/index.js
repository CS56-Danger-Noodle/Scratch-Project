import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_CLIENT_ID } from "../config-default.js";
import App from './App.jsx';
import styles from './styles/main.scss';


const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
);
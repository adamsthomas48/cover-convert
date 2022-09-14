import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import { Router } from "./components/router";
import { HashRouter } from "react-router-dom";
import { UserContext } from "./UserContext";
import { PlaylistContext } from "./PlaylistContext";
import ReactCrop from 'react-image-crop'
import "./App.scss";

export const App = () => {
    const CLIENT_ID = "e49897e1b71048d79ce37187284a983a";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token);
    }, []);

    return (
        <div className="App">
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
                crossOrigin="anonymous"
            ></script>
            {/* <header className="App-header">
                <h1>Spotify React</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
            </header> */}
            <UserContext.Provider value={{ token, setToken }}>
                <PlaylistContext.Provider value={{ playlistId, setPlaylistId, photoUrl, setPhotoUrl }}>
                    <HashRouter>
                        <Router />
                    </HashRouter>
                </PlaylistContext.Provider>
            </UserContext.Provider>
        </div>
    );
};

export default App;

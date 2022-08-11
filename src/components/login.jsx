import { Navbar, Nav, Container, NavDropdown, Button, Image } from 'react-bootstrap';
import logo from '../assets/white-logo-cropped.png';
import { useNavigate } from 'react-router';

export const Login = (props) => { 
    const CLIENT_ID = "e49897e1b71048d79ce37187284a983a"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const scopes = "ugc-image-upload user-read-private playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative"
    const navigate = useNavigate();

    

    return(
    <div className="body align-items-end" >
        <div className='container'>
        <div><Image src={logo} height="200vh" className='mt-5'/></div>
        <h1 className='mb-5'>Cover Convert</h1>
        
        <a className="btn btn-info "href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>Login
                          to Spotify</a>
        
        <hr className='my-4'/>
        <h2 >About</h2>
        <p className='lead'>Add some life to your spotify playlists by adding cover photos with only a few clicks!</p>
        <p>Cover Convert allows you to access your spotify playlists and easily set stunning cover photos from the wide library of unsplash.com. Cover Convert does not retain any 
            personal information from you spotify account and is completely free to use.
        </p>
        </div>
        
        
        

    </div>)
}
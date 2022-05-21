import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'



export const Home = () => { 
    const CLIENT_ID = "e49897e1b71048d79ce37187284a983a"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
  
  
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [user, setUser] = useState(null)
  
      useEffect(() => {
          const hash = window.location.hash
          let token = window.localStorage.getItem("token")
  
          if (!token && hash) {
              token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
              window.location.hash = ""
              window.localStorage.setItem("token", token)
              
          }
  
          setToken(token)
          //getPlaylists()
          console.log(token)
          console.log(user)
  
      }, [])

      
  
      const logout = () => {
          setToken("")
          window.localStorage.removeItem("token")
      }

      const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
    
        setArtists(data.artists.items)
        console.log(data)
      }

      const getPlaylists = async (authToken) => {
          
          const {currUser} = await axios.get(
              'https://api.spotify.com/v1/me/playlists', {
                  params: { limit: 50, offset: 0 },
                  headers: {
                      Accept: 'application/json',
                      Authorization: 'Bearer ' + token,
                      'Content-Type': 'application/json',
                  },
          })
          

          setUser(currUser)
          
      }
  
      return (
          <div className="App">
              <header className="App-header">
                  <h1>Spotify React</h1>
                  {!token ?
                      
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
                      : <div>
                          <button onClick={logout}>Logout</button>
                          <form onSubmit={searchArtists}>
                            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                            <button type={"submit"}>Search</button>
                          </form>
                          <button onClick={e => getPlaylists(token)}>Get Playlists</button>
                        </div>
                        }
              </header>
              
          </div>
      );    

}
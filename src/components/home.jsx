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
    const [playlists, setPlaylists] = useState([])
  
      useEffect(() => {
          const hash = window.location.hash
          let token = window.localStorage.getItem("token")
  
          if (!token && hash) {
              token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
              window.location.hash = ""
              window.localStorage.setItem("token", token)
              
          }
  
          setToken(token)
          
          
  
      }, [])

      
  
      const logout = () => {
          setToken("")
          setPlaylists([])
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

        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/playlists',
            params: {
                limit: 50,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }

        const res = await axios(options);
        console.log(res.data)
        setPlaylists(res.data.items)
                   
          
      }
  
      return (
          <div className="App">
              <header className="App-header">
                  <h1>Cover Convert</h1>
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

                    {playlists != null &&
                        <div>
                            {playlists.map((playlist) => (
                                <div key={playlist.id}>
                                    <h2>{playlist.name}</h2>
                                </div>
                            ))}
                        </div>
                    }
              </header>
              
          </div>
      );    

}
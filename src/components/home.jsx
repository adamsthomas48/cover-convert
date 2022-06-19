import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { PlaylistCard } from './playlist_card';



export const Home = () => { 
    const CLIENT_ID = "e49897e1b71048d79ce37187284a983a"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const scopes = "ugc-image-upload user-read-private playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative"
    const navigate = useNavigate();
  
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [user, setUser] = useState(null)
    const [playlists, setPlaylists] = useState([])
    const [image, setImage] = useState("")
    const [reducedImage, setReducedImage] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
  
      useEffect(() => {
          const hash = window.location.hash
          let token = window.localStorage.getItem("token")
          
          //getDataBlob("https://images.unsplash.com/photo-1578446303641-1cdffdd47c16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3175&q=80")
          
  
          if (!token && hash) {
              token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
              window.location.hash = ""
              window.localStorage.setItem("token", token)
          }    

          setToken(token)
          if(token !== null) {
            setLoggedIn(true)
            async function getData() {
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
            setPlaylists(res.data.items)
            console.log(res.data)
        }
        getData()
            
            
            
          }

  
      }, [])

      if(!loggedIn) {
        return (
            <div>
                <h1>Login</h1>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>Login</a>
            </div>
        )
    }

    if(loading) {
        
        return <div>Loading...</div>
    }

      

    
      
  
      const logout = () => {
          setToken("")
          setLoggedIn(false)
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
        setLoading(false)
                   
          
      }

      const parseURI = async (d) => {
        var reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
        reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
        return new Promise((res,rej)=> {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
          reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
            res(e.target.result)
          }
        })
      } 
      
      const getDataBlob = async (url) => {
        var res = await fetch(url);
        var blob = await res.blob();
        var uri = await parseURI(blob);
        setImage(uri)
        reduce_image_file_size(uri)
        return uri;
      }

      const reduce_image_file_size = async (base64Str, MAX_WIDTH = 200, MAX_HEIGHT = 200) => {
        let resized_base64 = await new Promise((resolve) => {
            let img = new Image()
            img.src = base64Str
            img.onload = () => {
                let canvas = document.createElement('canvas')
                let width = img.width
                let height = img.height
    
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width
                        width = MAX_WIDTH
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height
                        height = MAX_HEIGHT
                    }
                }
                canvas.width = width
                canvas.height = height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL()) // this will return base64 image results after resize
            }
        });
        // ommit data:image/jpeg;base64, from resized_base64
        let reduced_base64 = resized_base64.replace(/^data:image\/png;base64,/, '')
        setReducedImage(reduced_base64)
        //console.log(reduced_base64)
        return resized_base64;
    }

    const putImage = async (playlistId) => {
        // TODO: Put request to spotify api to upload image
        

        const options = {
            method: 'PUT',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/images`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "image/jpeg",
            },
            contentType: "image/jpeg",
            data: reducedImage
        }

        console.log("putImage")
        const res = await axios(options);
        console.log(res.data)
    }



  
      return (
          <div>
              <header>
                  <h1>Cover Convert</h1>
                  {!token ?  
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}>Login
                          to Spotify</a>
                      : <div>
                          <button onClick={logout}>Logout</button>
                          
                          <button onClick={e => getPlaylists(token)}>Get Playlists</button>
                          
                        </div>
                        }
                    <div>
                    {playlists != null &&
                        <div className='container'>
                            {playlists.map((playlist) => (
                                <div key={playlist.id} onClick={(e) => navigate(`playlist/${playlist.id}/${token}`)}> 
                                    <PlaylistCard title={playlist.name} token={token} playlist={playlist} />
                                </div>
                            ))}
                        </div>
                    }
                    </div>
              </header>
            
              
          </div>
      );    

}
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
  
  
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [user, setUser] = useState(null)
    const [playlists, setPlaylists] = useState([])
    const [image, setImage] = useState("")
    const [reducedImage, setReducedImage] = useState("")
  
      useEffect(() => {
          const hash = window.location.hash
          let token = window.localStorage.getItem("token")
          getDataBlob("https://images.unsplash.com/photo-1654868739497-ee031a3d7088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")
          
  
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

      const reduce_image_file_size = async (base64Str, MAX_WIDTH = 400, MAX_HEIGHT = 400) => {
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
        console.log(reduced_base64)
        return resized_base64;
    }

    const putImage = async (e) => {
        // TODO: Put request to spotify api to upload image
        console.log(reducedImage)

        const options = {
            method: 'PUT',
            url: 'https://api.spotify.com/v1/playlists/7CWNRFdWsl6O7wkAK6TOAA/images',
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
                          <form onSubmit={searchArtists}>
                            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                            <button type={"submit"}>Search</button>
                          </form>
                          <button onClick={e => getPlaylists(token)}>Get Playlists</button>
                          <button onClick={e => putImage(e)}>Put Image</button>
                        </div>
                        }
                    <div>
                    {playlists != null &&
                        <div className='container'>
                            {playlists.map((playlist) => (
                                <div key={playlist.id}> 
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
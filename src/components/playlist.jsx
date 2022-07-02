import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';

export const Playlist = () => { 
    const {playlistID} = useParams();
    const {token} = useParams();
    const client_id = "EtnnpBNihd-hEnnfF5XKAP-hQZdIlKwRYzv3E6-iJPw";

    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(true)
    const [photoURL, setPhotoURL] = useState("")
    const [reducedImage, setReducedImage] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [photoResults, setPhotoResults] = useState([]);

    useEffect(() => {

        getPlaylist();
        
        
        
    }, [])

    const getPlaylist = async () => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setPlaylist(data)
        setLoading(false)
    }



    if(loading) {
        return <div>Loading...</div>
    }

    const unsplashSearch = async () => {
        const {data} = await axios.get(`https://api.unsplash.com/search/photos?query=${searchValue}&client_id=${client_id}`)
        //console.log(data)

        let photos = []
        data.results.map(result => {
            photos.push(result.urls.regular)
        })
        setPhotoResults(photos)
        console.log(photos)
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
        //setImage(uri)
        //reduce_image_file_size(uri)
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
        reduced_base64.replace(/^data:image\/jpeg;base64,/, '')
        setReducedImage(reduced_base64)
        console.log(reduced_base64)
        return resized_base64;
    }

    const putImage = async (playlistId) => {
        // TODO: Put request to spotify api to upload image
        const uri = await getDataBlob(photoURL)
        const reduced_base64 = await reduce_image_file_size(uri)
        
        

        const options = {
            method: 'PUT',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/images`,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "image/jpeg",
            },
            contentType: "image/jpeg",
            data: reduced_base64
        }

        console.log("putImage")
        const res = await axios(options);
        console.log(res.data)
    }

    return(
    <div>
        <a href="/" >Home</a>
        <h1>{playlist.name}</h1>
        <div className="center">
            <img src={playlist.images[0].url} width="200px" height="200px"/>
        </div>
        
        <div className="center mt-5">
            <input type="text" placeholder='Search Unsplash' onChange={(e) => setSearchValue(e.target.value)}/>
            <button onClick={() => unsplashSearch()} text="Search">Search</button>
        </div>

        



    </div>)
}
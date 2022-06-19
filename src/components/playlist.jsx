import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';

export const Playlist = () => { 
    const {playlistID} = useParams();
    const {auth} = useParams();

    const [playlist, setPlaylist] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getPlaylist();
        
    }, [])

    const getPlaylist = async () => {
        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        setPlaylist(data)
        setLoading(false)
    }

    if(loading) {
        return <div>Loading...</div>
    }


    

    return(
    <div>
        
        <h1>{playlist.name}</h1>
        <img src={playlist.images[0].url} width="200px" height="200px"/>

    </div>)
}
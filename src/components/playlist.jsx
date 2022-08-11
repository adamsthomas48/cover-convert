import { useParams } from 'react-router-dom';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react';
import { TopNav } from './topNav';
import { Button, Form, InputGroup, Image as BsImage, Col, Row } from 'react-bootstrap';
import { splitArray, putImage } from '../api';

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
        
    })

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
        console.log(data)
        let images = splitArray(data.results)
        setPhotoResults(images)
        
    }




    return(
    <div>
        <TopNav />
        <div className="container mt-5 pt-4">
            <h1 className="mt-4">{playlist.name}</h1>
            <div className="center">
                <img src={playlist.images[0].url} width="200px" height="200px"/>
            </div>
            
            <div className="row justify-content-center mt-4 top-stick">
                <div className="col-lg-6">
                    <InputGroup size="lg">
                                
                        <Form.Control
                        placeholder="Search Unsplash"
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button variant="dark" onClick={() => unsplashSearch()}>Search</Button>
                    </InputGroup>
                </div>
                
            </div>
            
            <Row className="mt-5">
                <Col lg={6}>
                    {photoResults.length > 0 &&
                        
                        photoResults[0].map((photo) => (
                            <div className="mb-4 hover">
                                <BsImage src={photo.urls.regular} alt={photo.alt_description} width="100%" onClick={() => putImage(photo.urls.thumb, playlistID, token)} />
                            </div>
                            
                        ))
                    }
                </Col>
                <Col lg={6}>
                    {photoResults.length > 0 &&
                        
                        photoResults[1].map((photo) => (
                            <div className="mb-4 hover">
                                <BsImage src={photo.urls.regular} alt={photo.alt_description} width="100%" onClick={() => putImage(photo.urls.thumb, playlistID, token)}/>
                            </div>
                            
                        ))
                    }
                </Col>
            
            </Row>
        </div>




    </div>
    )
}
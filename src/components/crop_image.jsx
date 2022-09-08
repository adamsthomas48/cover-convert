import { PlaylistContext } from "../PlaylistContext";
import React, { useContext, useEffect, useState } from "react";


export const CropImage = (props) => {
    const {playlistId, setPlaylistId, photoUrl, setPhotoUrl} = useContext(PlaylistContext);
    console.log(playlistId);
    console.log(photoUrl);

    return (
        <div>
            <h1>Crop Image</h1>
        </div>
    );
};

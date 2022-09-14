import { PlaylistContext } from "../PlaylistContext";
import React, { useContext, useEffect, useState, useRef } from "react";
import { TopNav } from "./topNav";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
    Button,
    Form,
    InputGroup,
    Image as BsImage,
    Col,
    Row,
} from "react-bootstrap";

export const CropImage = (props) => {
    const { playlistId, setPlaylistId, photoUrl, setPhotoUrl } =
        useContext(PlaylistContext);
    console.log(playlistId);
    console.log(photoUrl);
    const [crop, setCrop] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const previewCanvasRef = useRef < HTMLCanvasElement > null;

    const cropped = (cropImage) => {
        console.log(cropImage);
    };

    return (
        <div>
            <TopNav />
            <div className="container mt-5 pt-4">
            <h1 className="my-4">Crop Image</h1>
            <div class="row">
                <div class="col-lg-6">
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => cropped(c)}
                        aspect={1}
                    >
                        <img src={photoUrl} />
                    </ReactCrop>
                </div>
                <div class="col-lg-6 justfiy-content-center">
                    <Button>Apply Crop</Button>
                </div>
            </div>

            </div>
        </div>
    );
};

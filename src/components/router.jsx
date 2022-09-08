import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { App } from "../App";
import { Home } from "./home";
import { Playlist } from "./playlist";
import { Login } from "./login";
import { ComponentTest } from "../pages/component-test";
import { CropImage } from './crop_image';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="#" element={<Home />} />
            <Route path="playlist/:playlistID/:token" element={<Playlist />} />
            <Route path="login" element={<Login />} />
            <Route path="dev/components" element={<ComponentTest />} />
            <Route path="playlist/crop" element={<CropImage />} />
        </Routes>
    );
};

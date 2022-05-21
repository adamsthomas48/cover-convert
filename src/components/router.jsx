import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from '../App'
import { Home } from './home'

export const Router = () => {

  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
     
    </Routes>
  );
};

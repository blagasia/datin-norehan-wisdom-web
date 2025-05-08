
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a redirect file to handle legacy "Home" imports
const Home = () => {
  return <Navigate to="/" replace />;
};

export default Home;

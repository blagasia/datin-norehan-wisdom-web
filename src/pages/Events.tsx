
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a redirect file to handle legacy "Events" imports
const Events = () => {
  return <Navigate to="/events" replace />;
};

export default Events;

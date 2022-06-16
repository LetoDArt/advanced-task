import React from 'react';
import { Navigate } from 'react-router-dom';
import MainPage from '../pages/MainPage';


export const publicRoutes = [
  {
    path: '/home',
    element: <MainPage />,
    exact: true,
  },
  {
    path: '*',
    element: <Navigate to="/home" />,
    exact: true,
  },
];

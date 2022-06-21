import React from 'react';
import { Navigate } from 'react-router-dom';
import Products from '../pages/Products/Products';
import Warehouses from '../pages/Warehouses/Warehouses';


export const publicRoutes = [
  {
    path: '/products',
    element: <Products />,
    exact: true,
  },
  {
    path: '/warehouses',
    element: <Warehouses />,
    exact: true,
  },
  {
    path: '*',
    element: <Navigate to="/products" />,
    exact: true,
  },
];

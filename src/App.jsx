import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes/routes';

import './App.scss';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.element}
              exact={route.exact}
              key={route.path}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

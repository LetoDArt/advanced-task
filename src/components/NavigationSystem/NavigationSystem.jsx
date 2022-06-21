import React from 'react';

import TopNavbar from '../TopNavbar/TopNavbar';

import { NAVIGATION_LINKS } from './consts';

import './NavigationSystem.scss';


const NavigationSystem = ({ children }) => (
  <div className="page-main-container">
    <TopNavbar links={NAVIGATION_LINKS} />
    <div className="page-content-container">
      {children}
    </div>
  </div>
);

export default NavigationSystem;

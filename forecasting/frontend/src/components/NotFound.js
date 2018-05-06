import React from 'react';
import TopNavbar from './TopNavbar/TopNavbar';

const NotFound = () => {
  return (
  <div>
      <TopNavbar />
      <div className="header" >
          <div className="header__overlay" />
          <div className="header__content" >
              <h1 className="header__motto" >Not Found</h1>
              <p className="header__mission" >The page you're looking for does not exists.</p>
          </div>
      </div>
  </div>
  )
}

export default NotFound;
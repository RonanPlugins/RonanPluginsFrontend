import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import "./Default.css"

const Default = () => {

 return (
  <>
   <Header />
   <div className='MainPageContainer'>
    <Outlet />
   </div>
   <Footer />
  </>
 );
};

export default Default;

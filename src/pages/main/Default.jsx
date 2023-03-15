import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import SmallHeader from './components/SmallHeader.jsx';
import "./Default.css"

const Default = () => {

 return (
  <>
         <SmallHeader id="emailverify" minutesopen={30} url={"test.com"} text="Please verify your email address."/>
         <Header />
   <div className='MainPageContainer'>
    <Outlet />
   </div>
   <Footer />
  </>
 );
};

export default Default;

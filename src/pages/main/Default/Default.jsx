import React from 'react';
import { Outlet } from 'react-router-dom';
import BetaPopup from '../PopUp/BetaPopup';
import Footer from '../components/HeaderAndFooter/Footer';
import Header from '../components/HeaderAndFooter/Header';
import SmallHeader from '../components/InfoBanner/SmallHeader';
import "./Default.css"
import Loading from '../../../util/Loading';

const Default = ({loading}) => {

 return (
       <>
            <BetaPopup/>
         <SmallHeader id="emailverify" minutesopen={30} url={"test.com"} text="Please verify your email address."/>
         <Header />
   <div className='MainPageContainer'>
                   { loading?<Loading/>:<Outlet />}
   </div>
   <Footer />
  </>
 );
};

export default Default;

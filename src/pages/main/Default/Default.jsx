import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import BetaPopup from '../PopUp/BetaPopup';
import Footer from '../components/HeaderAndFooter/Footer';
import Header from '../components/HeaderAndFooter/Header';
import SmallHeader from '../components/InfoBanner/SmallHeader';
import "./Default.css"
import Loading from '../../../util/Loading';
import UserContext from '../../../setup/app-context-manager/UserContext';

const Default = ({loading}) => {

      const { user } = useContext(UserContext)
 return (
       <>
             <BetaPopup />
             {user?.emailVerified == 1 ?
                   <SmallHeader id="emailverify" minutesopen={30} url={null} text="Please check your inbox to verify email address." />
                   : ""
             }
         <Header />
   <div className='MainPageContainer'>
                   { loading?<Loading/>:<Outlet />}
   </div>
   <Footer />
  </>
 );
};

export default Default;

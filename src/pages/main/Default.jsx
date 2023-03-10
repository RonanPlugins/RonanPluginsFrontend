import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

const MainPageContainer = styled.div`
  padding-top: 40px;
  background-color: #4d4459;
  position: relative;
  overflow: hidden;
  width:100%;
  color: #fff;
  min-height: 100vh;
 `;
 
const Default = () => {

 return (
  <>
   <Header />
   <MainPageContainer>
    <Outlet />
   </MainPageContainer>
   <Footer />
  </>
 );
};

export default Default;

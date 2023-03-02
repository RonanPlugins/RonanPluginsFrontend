import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';

 const Containter = styled.div`
  height: 100%;
  margin: 0;
 `;
 const MainPageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
 `;
const Default = () => {

 return (
  <Containter>
   <Header />
   <MainPageContainer>
    <Outlet />
   </MainPageContainer>
   <Footer />
  </Containter>
 );
};

export default Default;

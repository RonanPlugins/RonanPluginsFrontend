import React from 'react';
import styled from 'styled-components';
const MainFooter = styled.div`
 width: 100%;
 height: 130px;
 background-color: #4d4459;
 display: flex;
 align-items: center;
 padding: 30px;
 color: #fff;
 font-family: 'Russo One', sans-serif;
 font-size: 40px;
`;
const SubText = styled.p``;
const Footer = () => {
 return (
  <MainFooter>
   RonanCraft
   <SubText></SubText>
  </MainFooter>
 );
};

export default Footer;

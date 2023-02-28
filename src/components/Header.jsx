import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import UserContext from '../context/UserContext';
 const Nav = styled.nav`
  background-color: #595472;
  font-family: 'Russo One', sans-serif;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 20);
  z-index: 10;
 `;
 const NavLink = styled(Link)`
  font-size: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
   color: #ed97c2;
  }
  &:hover {
   color: #ed97c2;
  }
 `;
 const Bars = styled(FaBars)`
  display: none;
  color: #ed97c2;
  @media screen and (max-width: 768px) {
   display: block;
   position: absolute;
   top: 0;
   right: 0;
   transform: translate(-100%, 75%);
   font-size: 1.8rem;
   cursor: pointer;
  }
 `;
 const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
   display: none;
  }
 `;
 const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
   display: none;
  }
 `;

 const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background-color: #ed97c2;
  padding: 10px 22px;
  color: #ffff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
   transition: all 0.2s ease-in-out;
   background: #e917aa;
  }
 `;
const Header = () => {

 const { user } = useContext(UserContext);

 return (
  <>
   <Nav>
    <NavLink to="/">
     <h1>Logo</h1>
    </NavLink>
    <Bars />
    <NavMenu>
     <NavLink to="/plugins">
      Plugins
     </NavLink>
     <NavLink to="/support">
      Support
     </NavLink>
     <NavLink to="/discord">
      Discord
     </NavLink>
     <NavLink to="/github">
      Github
     </NavLink>
     {/* Second Nav */}
     {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    </NavMenu>
    <NavBtn>
     <NavBtnLink to={'/' + user ? 'signin' : 'dashboard'}>
      {user ? 'Dashboard' : 'Sign In'}
     </NavBtnLink>
    </NavBtn>
   </Nav>
  </>
 );
};

export default Header;

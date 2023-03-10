import React, { useContext,useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaSignOutAlt, FaSignInAlt,FaDiscord,FaMoneyCheckAlt,FaCogs } from 'react-icons/fa';
import UserContext from '../../../setup/app-context-manager/UserContext.jsx';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Button,
      Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
    useDisclosure,
  Input,
  ButtonGroup,
} from '@chakra-ui/react';


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
const MobileNavButton = styled(Button)`
margin-top: 10px;
width: 80%;
`;
const HeaderLogo = styled.img`
 width: 50px;
 height: 50px;
`;

const Header = () => {
    const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
    return (
        <>
            <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
                    finalFocusRef={btnRef}
                    
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
                        <DrawerBody>

            <MobileNavButton href='/account' colorScheme='pink'>Home</MobileNavButton>
            <MobileNavButton  colorScheme='pink'>Plugins</MobileNavButton>
            <MobileNavButton  colorScheme='pink'>Discord</MobileNavButton>
            <MobileNavButton  colorScheme='pink'>Github</MobileNavButton>
                        </DrawerBody>
                        <DrawerFooter>
                            <Menu>
                        <MenuButton as={MobileNavButton} colorScheme='pink'>
                            Profile
                        </MenuButton>
                        <MenuList>
                            
                            <MenuGroup title='Profile'>
                                {user ?(<><MenuItem icon={<FaCogs />} as='a' href='/account'>My Account</MenuItem><MenuItem icon={<FaMoneyCheckAlt />} as='a' href='/account/payments'>Payments </MenuItem><MenuItem icon={<FaSignOutAlt />} as='a' href='/logout'>LogOut </MenuItem></>):(<MenuItem icon={<FaSignInAlt />} as='a' href='/login'>Login</MenuItem>)}
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem icon={<FaDiscord />}>Discord</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                        </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
            <Nav>
                <NavLink to="/">
                    <HeaderLogo
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Meme_Man_on_transparent_background.webp/316px-Meme_Man_on_transparent_background.webp.png"
                        alt="Logo"
                    />
                </NavLink>
                <Bars onClick={onOpen}/>
                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/plugins">Plugins</NavLink>
                    <NavLink to="https://discord.com/invite/8Kt4wKm">Discord</NavLink>
                    <NavLink to="https://github.com/SuperRonanCraft">Github</NavLink>
                </NavMenu>
                <NavBtn>
                    <Menu>
                        <MenuButton as={Button} colorScheme='pink'>
                            Profile
                        </MenuButton>
                        <MenuList>
                            
                            <MenuGroup title='Profile'>
                                {user ?(<><MenuItem icon={<FaCogs />} as='a' href='/account'>My Account</MenuItem><MenuItem icon={<FaMoneyCheckAlt />} as='a' href='/account/payments'>Payments </MenuItem><MenuItem icon={<FaSignOutAlt />} as='a' href='/logout'>LogOut </MenuItem></>):(<MenuItem icon={<FaSignInAlt />} as='a' href='/login'>Login</MenuItem>)}
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem icon={<FaDiscord />}>Discord</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Header;

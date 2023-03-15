import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./HeaderAndFooter.css"
import { FaBars, FaSignOutAlt, FaSignInAlt, FaDiscord, FaMoneyCheckAlt, FaCogs } from 'react-icons/fa';
import UserContext from '../../../../setup/app-context-manager/UserContext';
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
    FormLabel,
} from '@chakra-ui/react';

import { BsFillHouseFill, BsFillPlugFill, BsDiscord, BsGithub, BsFillPersonFill, BsFillDoorOpenFill, BsGrid1X2,BsInfoCircleFill } from "react-icons/bs"

const Header = () => {
    const { user } = useContext(UserContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    return (
        <div>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}

            >
                <DrawerOverlay />
                <DrawerContent >
                    <DrawerCloseButton />
                    <DrawerHeader>Navigation</DrawerHeader>
                    <DrawerBody>
                        <FormLabel className='formlabel'>Pages</FormLabel>
                        <Button className='MobileNavButton' leftIcon={<BsFillHouseFill />} as={"a"} href='/account'>Home</Button>
                        <Button className='MobileNavButton' leftIcon={<BsFillPlugFill />} as={"a"} href='/plugins'>Plugins</Button>
                        <Button className='MobileNavButton' leftIcon={<BsInfoCircleFill />} as={"a"} href='/about-us'>About Us</Button>
                        <FormLabel className='formlabel'>Profile</FormLabel>
                        {user ? (
                            <>
                                <Button className='MobileNavButton' leftIcon={<BsGrid1X2 />} as={"a"} href='/account'>Account</Button>
                                <Button className='MobileNavButton' leftIcon={<BsFillDoorOpenFill />} as={"a"} href='/logout'>Logout</Button>
                            </>
                        ) : (
                            <Button className='MobileNavButton' leftIcon={<BsFillPersonFill />} as={"a"} href='/login'>Login</Button>
                            )}
                            <FormLabel className='formlabel'>Links</FormLabel>
                            <Button className='MobileNavButton' leftIcon={<BsDiscord />} as={"a"} href='https://discord.com/invite/8Kt4wKm'>Discord</Button>
                            <Button className='MobileNavButton' leftIcon={<BsGithub />} as={"a"} href='https://github.com/SuperRonanCraft'>Github</Button>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className='Nav'>
                <Link className='NavLink' to="/">
                    <img className='HeaderLogo'
                        src="/assets/logo.webp"
                        alt="Logo"
                    />
                </Link>
                <FaBars className='Bars' onClick={onOpen} />
                <div className='NavMenu'>
                    <Link className='NavLink' to="/">Home</Link>
                    <Link className='NavLink' to="/plugins">Plugins</Link>
                    <Link className='NavLink' to="/about-us">AboutUs</Link>
                    <Link className='NavLink' to="https://discord.com/invite/8Kt4wKm">Discord</Link>
                    <Link className='NavLink' to="https://github.com/SuperRonanCraft">Github</Link>
                </div>
                <nav className='NavBtn'>
                    <Menu>
                        <MenuButton as={Button} className="ProfileButton" colorScheme='pink'>
                            Profile
                        </MenuButton>
                        <MenuList>

                            <MenuGroup title='Profile'>
                                {user ? (<><MenuItem icon={<FaCogs />} as='a' href='/account'>My Account</MenuItem><MenuItem icon={<FaMoneyCheckAlt />} as='a' href='/account/payments'>Payments </MenuItem><MenuItem icon={<FaSignOutAlt />} as='a' href='/logout'>LogOut </MenuItem></>) : (<MenuItem icon={<FaSignInAlt />} as='a' href='/login'>Login</MenuItem>)}
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem icon={<FaDiscord />}>Discord</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </nav>
            </div>
        </div>
    );
};

export default Header;

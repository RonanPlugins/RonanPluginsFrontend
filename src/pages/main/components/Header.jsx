import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./HeaderAndFooter.css"
import { FaBars, FaSignOutAlt, FaSignInAlt, FaDiscord, FaMoneyCheckAlt, FaCogs } from 'react-icons/fa';
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
} from '@chakra-ui/react';


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
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Navigation</DrawerHeader>
                        <DrawerBody>

                            <Button className='MobileNavButton' href='/account' colorScheme='pink'>Home</Button>
                            <Button className='MobileNavButton' colorScheme='pink'>Plugins</Button>
                            <Button className='MobileNavButton' colorScheme='pink'>Discord</Button>
                            <Button className='MobileNavButton' colorScheme='pink'>Github</Button>
                        </DrawerBody>
                        <DrawerFooter>
                            <Menu>
                                <MenuButton className='MobileNavButton' colorScheme='pink'>
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
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            <div className='Nav'>
                <Link className='NavLink' to="/">
                    <img className='HeaderLogo'
                        src="https://imgur.com/gWagMWE.png"
                        alt="Logo"
                    />
                </Link>
                <FaBars className='Bars' onClick={onOpen} />
                <div className='NavMenu'>
                    <Link className='NavLink' to="/">Home</Link>
                    <Link className='NavLink' to="/plugins">Plugins</Link>
                    <Link className='NavLink' to="https://discord.com/invite/8Kt4wKm">Discord</Link>
                    <Link className='NavLink' to="https://github.com/SuperRonanCraft">Github</Link>
                </div>
                <nav className='NavBtn'>
                    <Menu>
                        <MenuButton as={Button} colorScheme='pink'>
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

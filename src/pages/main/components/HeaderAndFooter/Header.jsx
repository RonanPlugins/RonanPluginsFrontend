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

import Messages from '../../../../libs/Messages';
import Links from '../../../../libs/Links';
import Icons from '../../../../libs/Icons';

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
                    <DrawerHeader>{Messages.Navigation}</DrawerHeader>
                    <DrawerBody>
                        <FormLabel className='formlabel'>{Messages.Pages}</FormLabel>
                        {/*TODO update this to use PLUGINS, PLANS, MY ACCOUNT on navbar.
                         TODO remove profile button and use MY ACCOUNT instead*/}
                        <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Home} />} as={"a"} href={Links.Home}>{Messages.Home}</Button>
                        <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Plugins} />} as={"a"} href={Links.Plugins}>{Messages.Plugins}</Button>
                        <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.About} />} as={"a"} href={Links.About}>{Messages.About}</Button>
                        <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Tiers} />} as={"a"} href={Links.Tiers}>{Messages.Tiers}</Button>
                        <FormLabel className='formlabel'>{Messages.Profile}</FormLabel>
                        {user ? (
                            <>
                                <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Account} />} as={"a"} href={Links.Account}>{Messages.Account}</Button>
                                <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Logout} />} as={"a"} href={Links.Logout}>{Messages.Logout}</Button>
                            </>
                        ) : (
                            <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Login} />} as={"a"} href={Links.Login}>{Messages.Login}</Button>
                            )}
                            <FormLabel className='formlabel'>{Messages.Links}</FormLabel>
                        <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Discord} />} as={"a"} href={Links.Discord}>{Messages.Discord}</Button>
                            <Button className='MobileNavButton' leftIcon={<Icons.GetIconFromString nameIcon={Icons.Github} />} as={"a"} href={Links.Github}>{Messages.Github}</Button>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <div className='Nav'>
                <Link className='NavLogo' to="/">
                    <img className='HeaderLogo'
                        src="/assets/logo.webp"
                        alt="Logo"
                    />
                    <h1>
                        RonanPlugins
                    </h1>
                </Link>
                <button onClick={onOpen} className="Bars">
                    <Icons.GetIconFromString nameIcon={Icons.Bars} propsIcon={{ className: 'Bars' }} />
                </button>
                <div className='NavMenu'>
                    {Messages.HeaderLinks.map((link) => {
                        return (
                            <Link className='NavLink' to={link.URL}>{link.Text}</Link>
                        )
                    })}
                    <Menu>
                        <MenuButton className='NavLink'>
                            {Messages.MyAccount.toUpperCase()}
                        </MenuButton>

                        <MenuList>
                            <MenuGroup title='Profile'>
                                {console.log(user)}
                                {user ? (<><MenuItem icon={<Icons.GetIconFromString nameIcon={Icons.Bars} />} as='a' href={Links.Account}>{ Messages.MyAccount}</MenuItem><MenuItem icon={<Icons.GetIconFromString nameIcon={Icons.Payments} />} as='a' href='/account/payments'>Payments </MenuItem><MenuItem icon={<Icons.GetIconFromString nameIcon={Icons.Logout} />} as='a' href='/logout'>LogOut </MenuItem></>) : (<MenuItem icon={<Icons.GetIconFromString nameIcon={Icons.Login} />} as='a' href='/login'>Login</MenuItem>)}
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem icon={<Icons.GetIconFromString nameIcon={Icons.Discord} />} as={"a"}  href={Links.Discord} >{Messages.Discord}</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;

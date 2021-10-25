import {
    Avatar,
    Button,
    Divider,
    Drawer,
    Input,
    Select,
    Text,
} from '@geist-ui/react';
import React, { useState } from 'react';
import AlignJustify from '@geist-ui/react-icons/alignJustify';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { app, auth, db } from '../firebaseSetup.js';
import { signOut } from 'firebase/auth';
import UserImg from '../assets/images/user.jpg';
import { useHistory } from 'react-router-dom';
import { Search } from '@geist-ui/react-icons';
import { useTranslation } from 'react-i18next';
import useResponsiveWindow from '../hooks/useResponsiveWindow';

function Navbar() {
    const [state, setState] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [placement, setPlacement] = useState('');
    const { isMobile } = useResponsiveWindow();

    const open = (text) => {
        setPlacement(text);
        setState(true);
    };

    const history = useHistory();

    const handleSearchBar = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        history.push(`/results/${searchTerm.split(' ').join('-')}`);
    };
    const { t, i18n } = useTranslation();
    function handleClick(lang) {
        i18n.changeLanguage(lang);
    }

    return (
        <NavbarContainer>
            <Nav>
                <Logo>
                    <AlignJustify onClick={() => open('left')} />
                    <Text h3 style={{ margin: 0 }}>
                        Workkar
                    </Text>
                </Logo>
                <Text p margin={0}>
                    {auth.currentUser && auth.currentUser.uid
                        ? auth.currentUser.email
                        : ''}
                </Text>
                <>
                    {!isMobile ? (
                        <>
                            <Select placeholder='Choose Language' pure>
                                <Select.Option value='1'>Kannada</Select.Option>
                                <Select.Option value='2'>Tamil</Select.Option>
                                <Select.Option value='3'>
                                    Malayalam
                                </Select.Option>
                                <Select.Option value='4'>Telugu</Select.Option>
                                <Select.Option value='5'>Hindi</Select.Option>
                            </Select>
                        </>
                    ) : (
                        <></>
                    )}
                </>
                {/* <Button onClick={() => handleClick('en')}>English</Button>
                <Button onClick={() => handleClick('ko')}>Kannada</Button> */}
            </Nav>
            <Drawer
                visible={state}
                onClose={() => setState(false)}
                placement={placement}>
                <Drawer.Title>
                    <Text h3 style={{ margin: 0 }}>
                        Workkar
                    </Text>
                </Drawer.Title>
                <Drawer.Subtitle>Work karo, Pockets bharo</Drawer.Subtitle>
                <Drawer.Content>
                    <Input
                        scale={4 / 3}
                        placeholder='Search for mechanic...'
                        width='100%'
                        clearable
                        onChange={handleSearchBar}
                        iconRight={<Search />}
                        iconClickable
                        onIconClick={handleSearch}
                        type='success'
                    />
                    <NavItems>
                        <Text p>
                            <StyledNavLink to='/' activeClassName='active'>
                                Home
                            </StyledNavLink>
                        </Text>
                        <Divider />
                        <Text p>
                            <StyledNavLink
                                to='/explore'
                                activeClassName='active'>
                                Explore
                            </StyledNavLink>
                        </Text>

                        <Divider />
                        <Text p>
                            <StyledNavLink
                                to='/yourjobs'
                                activeClassName='active'>
                                Your Jobs
                            </StyledNavLink>
                        </Text>
                        <Divider />
                        <Text p>
                            <StyledNavLink
                                to='/listings'
                                activeClassName='active'>
                                Job Listings
                            </StyledNavLink>
                        </Text>
                        <Divider />
                        <Text p>
                            <StyledNavLink to='/post' activeClassName='active'>
                                Post a job!
                            </StyledNavLink>
                        </Text>
                        <Divider />
                        <Button
                            type='success-light'
                            width={'100%'}
                            onClick={() => {
                                if (
                                    auth.currentUser &&
                                    auth.currentUser.uid !== null
                                ) {
                                    signOut(auth)
                                        .then(() => {
                                            console.log('SignOut Success');
                                        })
                                        .catch((error) => {
                                            // An error happened.
                                        });
                                }
                            }}>
                            <StyledNavLink
                                style={{ color: 'white' }}
                                to='/login'
                                activeClassName='active'>
                                {auth.currentUser && auth.currentUser.uid
                                    ? 'Log Out'
                                    : 'Login'}
                            </StyledNavLink>
                        </Button>
                    </NavItems>
                </Drawer.Content>
            </Drawer>
        </NavbarContainer>
    );
}

export default Navbar;

const NavbarContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1000;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 2rem;
    box-shadow: 1px 1px 1px 1px lightgray;
`;

const NavItems = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
    color: black;
    &:hover {
    }
`;

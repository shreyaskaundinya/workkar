import { Text, Input, Button, Image, Link } from '@geist-ui/react';
import React, { useState } from 'react';
import { BasePage, colors } from '../utils/globalStyles';
import styled from 'styled-components';
import { Search } from '@geist-ui/react-icons';
import Jobsgrid from '../components/Jobsgrid';

import PostImg from '../assets/svgs/post.svg';
import ChooseImg from '../assets/svgs/choose.svg';
import PaymentImg from '../assets/svgs/paid.svg';
import Logo from '../assets/images/logo.png';
import { mediaQuery } from '../utils/mediaQuery';
import { useHistory } from 'react-router-dom';

function Home(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();

    const handleSearchBar = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        history.push(`/results/${searchTerm.split(' ').join('-')}`);
    };

    const categories = [
        'Data Entry',
        'Delivery Boy',
        'Technician',
        'Electrician',
        'Mechanic',
        'Plumber',
        'Flowerist',
    ];

    return (
        <>
            <Container>
                <Center color='#A2D2FF'>
                    <Header>
                        {/* <Image src={Logo} alt='logo' /> */}
                        <Text h1 style={{ textAlign: 'center' }}>
                            Welcome to Workkar!
                        </Text>
                        {/* <Text style={{ textAlign: 'center' }} font={'1.25em'}>
                            Work karo, Pockets baro!
                        </Text> */}
                        <SearchBar>
                            <Input
                                scale={4 / 3}
                                placeholder='Search for mechanic...'
                                width='100%'
                                clearable
                                onChange={handleSearchBar}
                                type='success'
                            />
                            <Button
                                type='success-light'
                                auto
                                iconRight={<Search size={36} />}
                                onClick={handleSearch}></Button>
                        </SearchBar>
                        <Categories>
                            <Text p>Some Popular Categories : </Text>
                            {categories.map((c, i) => (
                                <Text key={i}>
                                    <Link
                                        href={`results/${c
                                            .toLowerCase()
                                            .replace(' ', '-')}`}
                                        underline>
                                        {c}
                                    </Link>
                                </Text>
                            ))}
                            <Text p>...</Text>
                        </Categories>
                    </Header>
                </Center>
                <Center color='white'>
                    <WhatToDo>
                        <Text
                            h2
                            style={{
                                textAlign: 'center',
                                paddingBottom: '2rem',
                            }}>
                            How It Works?
                        </Text>
                        <Cards>
                            <TodoCard>
                                <Image
                                    src={PostImg}
                                    width='200px'
                                    height='200px'
                                    alt='Add Posts'
                                />
                                <Text p>
                                    Post some jobs you'd like to delegate!
                                </Text>
                            </TodoCard>
                            <TodoCard>
                                <Image
                                    src={ChooseImg}
                                    width='200px'
                                    height='200px'
                                    alt='Add Posts'
                                />
                                <Text p>
                                    Choose from various jobs posted to get some
                                    pocket money!
                                </Text>
                            </TodoCard>
                            <TodoCard>
                                <Image
                                    src={PaymentImg}
                                    width='200px'
                                    height='200px'
                                    alt='Add Posts'
                                />
                                <Text p>
                                    Finish the job assigned and get the money!
                                </Text>
                            </TodoCard>
                        </Cards>
                    </WhatToDo>
                </Center>
                <Jobs>
                    <Text h2 style={{ textAlign: 'center' }}>
                        Some trending jobs...
                    </Text>
                    {/* <Jobsgrid /> */}
                </Jobs>
                <Testimonials></Testimonials>
            </Container>
        </>
    );
}

export default Home;

const Center = styled.div`
    display: grid;
    place-items: center;
    padding: 6rem 4rem;
    background-color: ${(props) => (props.color ? props.color : 'white')};
`;
const SearchBar = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
`;

const Header = styled.div``;

const WhatToDo = styled.div``;

const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
    gap: 5rem;

    ${mediaQuery('xl')} {
        gap: 3rem;
    }
    ${mediaQuery('sm')} {
        gap: 2rem;
    }
`;
const TodoCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    max-width: 250px;
    text-align: center;
`;

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Jobs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 0 4rem;
`;
const Testimonials = styled.div``;

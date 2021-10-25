import React from 'react';
import styled from 'styled-components';

function Footer(props) {
    return (
        <FooterContainer>
            <p>Coming soon...</p>
        </FooterContainer>
    );
}

export default Footer;

const FooterContainer = styled.div`
    background-color: black;
    display: grid;
    place-items: center;
    padding: 0.5rem 3rem;
    color: white;
`;

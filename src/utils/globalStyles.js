import { Text } from '@geist-ui/react';
import styled from 'styled-components';
import { mediaQuery } from './mediaQuery';

export const BasePage = styled.div`
    min-height: 100vh;
    padding: 4rem;

    ${mediaQuery('sm')} {
        padding: 2rem;
    }
`;

export const ErrorText = () => {
    <Text p>Error</Text>;
};

export const colors = {
    darkBlue: 'rgba(61, 90, 128, 1)',
    lightBlue: 'rgba(152, 193, 217, 1)',
    lightCyan: 'rgba(224, 251, 252, 1)',
    orange: 'rgba(238, 108, 77, 1)',
    darkGray: 'rgba(41, 50, 65, 1)',
    black: 'rgba(18, 11, 2, 1)',
};

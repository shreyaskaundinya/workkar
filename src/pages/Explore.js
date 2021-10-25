import { Text } from '@geist-ui/react';
import React from 'react';
import Jobsgrid from '../components/Jobsgrid';
import { BasePage } from '../utils/globalStyles';

import { jobs } from '../utils/sampleJobs';

function Explore(props) {
    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Explore
            </Text>
            <Jobsgrid />
        </BasePage>
    );
}

export default Explore;

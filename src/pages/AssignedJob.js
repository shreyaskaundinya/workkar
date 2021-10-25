import React from 'react';
import { auth } from '../firebaseSetup';
import { BasePage } from '../utils/globalStyles';
import { Note, Text } from '@geist-ui/react';

function AssignedJob(props) {
    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Assigned Jobs
            </Text>
            {auth.currentUser && auth.currentUser.uid !== null ? (
                <></>
            ) : (
                <>
                    <Note>Jobs can't be assigned before you log in!!</Note>
                </>
            )}
        </BasePage>
    );
}

export default AssignedJob;

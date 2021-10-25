import {
    Button,
    Loading,
    Spacer,
    Table,
    Text,
    Toggle,
    Collapse,
    useModal,
    Rating,
    Modal,
    Note,
} from '@geist-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
// import useResponsiveWindow from '../hooks/useResponsiveWindow';
import { BasePage } from '../utils/globalStyles';
// import { jobs } from '../utils/sampleJobs';
import {
    getDocs,
    collection,
    query,
    where,
    updateDoc,
    doc,
    getDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebaseSetup';
import { useHistory } from 'react-router-dom';
import AssignedJob from './AssignedJob';

function JobListings(props) {
    // const { isTablet } = useResponsiveWindow();
    const { isLoading, isError, isFetched, data } = useQuery(
        'jobListings',
        async () => {
            const q = query(
                collection(db, 'jobList'),
                where('userid', '==', auth.currentUser.uid)
            );
            const querySnap = await getDocs(q);
            console.log(Array(...querySnap.docs.map((item) => item.data())));
            return Array(
                ...querySnap.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        },
        {
            enabled: !!auth.currentUser && !!auth.currentUser.uid,
        }
    );

    const [ratingVal, setRatingVal] = useState(0);
    const { visible, setVisible, bindings } = useModal();

    const history = useHistory();
    const renderAssigned = (value, rowData, index) => {
        return (
            <>
                {rowData.isAssigned ? (
                    <Collapse title={rowData.assignedName}>
                        <Text></Text>
                    </Collapse>
                ) : (
                    <Text p>-</Text>
                )}
            </>
        );
    };

    const updateRating = (rowData) => {
        getDocs(
            query(
                collection(db, 'userDetails'),
                where('userid', '==', rowData.assignedid)
            )
        )
            .then((snap) => {
                return {
                    ...snap.docs.map((item) => {
                        return { ...item.data(), id: item.id };
                    })[0],
                };
            })
            .then((docData) => {
                console.log([...docData.rating, ratingVal]);
                updateDoc(doc(db, 'userDetails', docData.id), {
                    rating: [...docData.rating, ratingVal],
                });
            });
    };

    // const askReview = (rowData) => {};
    const renderIsComplete = (value, rowData, index) => {
        return (
            <>
                <Toggle
                    onChange={(event) => {
                        setVisible(true);
                    }}
                />
                <Modal {...bindings}>
                    <Modal.Title></Modal.Title>
                    <Modal.Subtitle>
                        Give your rating for {rowData.assignedName}!
                    </Modal.Subtitle>
                    <Modal.Content>
                        <Rating
                            value={ratingVal}
                            onValueChange={setRatingVal}
                        />
                    </Modal.Content>
                    <Modal.Action
                        passive
                        onClick={() => {
                            setVisible(false);
                            updateRating(rowData);
                        }}>
                        Submit
                    </Modal.Action>
                </Modal>
            </>
        );
    };

    const renderCheckApplicants = (value, rowData, index) => {
        const checkApplicantsHandler = (id) => {
            history.push(`/applicants/${id}`);
        };
        return (
            <Button
                auto
                type='success-light'
                onClick={() => checkApplicantsHandler(rowData.id)}>
                Check Applicants
            </Button>
        );
    };

    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Your Job Listings
            </Text>
            <Spacer h={2} />
            {isLoading && !isFetched ? (
                <Loading />
            ) : (
                <>
                    {auth.currentUser && auth.currentUser.uid !== null ? (
                        <>
                            <Table data={data}>
                                <Table.Column prop='title' label='Title' />
                                <Table.Column prop='salary' label='salary' />
                                <Table.Column
                                    prop='checkApplicants'
                                    label='Check Applicants'
                                    render={renderCheckApplicants}
                                />
                                <Table.Column
                                    prop='assignedUser'
                                    label='Assigned'
                                    render={renderAssigned}
                                />
                                <Table.Column
                                    prop='isComplete'
                                    label='is Complete'
                                    render={renderIsComplete}
                                />
                            </Table>
                        </>
                    ) : (
                        <>
                            <Note>You don't seemed to have logged in!</Note>
                        </>
                    )}
                </>
            )}
        </BasePage>
    );
}

export default JobListings;

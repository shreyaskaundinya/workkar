import { Grid, Loading, Text } from '@geist-ui/react';
import React from 'react';
import JobCard from './JobCard';
import { getDocs, collection, query } from 'firebase/firestore';
import { auth, db } from '../firebaseSetup';
import { useQuery } from 'react-query';

function Jobsgrid({ tag, limit }) {
    const { isLoading, isError, data } = useQuery('jobs', async () => {
        const q = query(collection(db, 'jobList'));
        const querySnap = await getDocs(q);
        const userid = auth?.currentUser?.uid;
        return Array(
            ...querySnap.docs
                .map((item) => {
                    return { ...item.data(), id: item.id };
                })
                .filter(
                    (item) =>
                        item.userid !== userid &&
                        !item.isCompleted &&
                        !item.isAssigned
                )
        );
    });
    return (
        <>
            {isError ? (
                <Text p>Error...</Text>
            ) : (
                <>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <Grid.Container gap={3} justify='center'>
                            {data.map((job, i) => (
                                <Grid
                                    key={i}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    xl={4}>
                                    <JobCard details={job} />
                                </Grid>
                            ))}
                        </Grid.Container>
                    )}
                </>
            )}
        </>
    );
}

export default Jobsgrid;

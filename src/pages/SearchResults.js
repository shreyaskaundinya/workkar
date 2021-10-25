import { Grid, Loading, Text } from '@geist-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getDocs, collection } from 'firebase/firestore';
import JobCard from '../components/JobCard';
import { BasePage, ErrorText } from '../utils/globalStyles';
import { jobs } from '../utils/sampleJobs';
import { auth, db } from '../firebaseSetup';

function SearchResults() {
    var { term } = useParams();
    var keywords = term.split('-');

    const contains = (str, words) => {
        return (
            words.filter((word) =>
                str.toLowerCase().includes(word.toLowerCase())
            ).length > 0
        );
    };

    const { isLoading, isError, data } = useQuery('searchResults', () =>
        getDocs(collection(db, 'jobList')).then((querySnap) => {
            return Array(
                ...querySnap.docs
                    .map((item) => {
                        return item.data();
                    })
                    .filter((item) => {
                        // console.log(item.title, contains(item.title, keywords));
                        const userid = auth?.currentUser.uid || '';

                        return (
                            (item.userid !== userid &&
                                !item.isCompleted &&
                                !item.isAssigned &&
                                contains(item.title, keywords)) ||
                            contains(item.desc, keywords) ||
                            contains(item.tags.join(' '), keywords)
                        );
                    })
            );
        })
    );

    return (
        <BasePage>
            <Text h1>Search Results Page</Text>
            <Grid.Container gap={3} justify='center'>
                {isError ? (
                    <Text p>Error...</Text>
                ) : isLoading ? (
                    <Loading />
                ) : (
                    <>
                        {data.map((job) => (
                            <Grid xs={24} sm={12} md={8} lg={6} xl={4}>
                                <JobCard details={job} />
                            </Grid>
                        ))}
                    </>
                )}
            </Grid.Container>
        </BasePage>
    );
}

export default SearchResults;

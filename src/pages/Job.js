import {
    Card,
    Divider,
    Image,
    Tag,
    Text,
    User,
    Grid,
    useTheme,
    Spacer,
    Badge,
    Button,
    Loading,
} from '@geist-ui/react';
import { app, auth, db } from '../firebaseSetup.js';
import { getDocs, collection, query } from 'firebase/firestore';
import { useQuery } from 'react-query';

import React from 'react';
import { BasePage } from '../utils/globalStyles';
import { useParams } from 'react-router-dom';
const cardStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 2px',
};
const imgStyle = {
    margin: 'auto',
    borderRadius: '200px',
    width: '200px',
    display: 'block',
};
var phone = ' 9538655010';
var city = 'Bengaluru';
var salary = 50000;
var priority = 'High';
var priorityColor =
    priority === 'High'
        ? '#FF0000'
        : priority === 'med'
        ? '#9EDE73'
        : '#FDCA40';

function Job(props) {
    const { id } = useParams();
    var querySnap;
    const { isLoading, isError, data } = useQuery('jobListings', async () => {
        const q = query(collection(db, 'jobList'));
        querySnap = await getDocs(q);
        return Array(
            ...querySnap.docs
                .map((item) => {
                    return {
                        ...item.data(),
                        id: item.id,
                    };
                })
                .filter((item) => item.id === id)
        )[0];
    });
    var priorityColor =
        data?.priority === 'High'
            ? '#FF0000'
            : data?.priority === 'med'
            ? '#FDCA40'
            : '#9EDE73';
    return (
        <BasePage>
            {isError ? (
                <Text p type='danger'>
                    Error occurred...
                </Text>
            ) : isLoading ? (
                <Loading />
            ) : (
                <>
                    <Card>
                        <Grid.Container gap={2} justify='center'>
                            <Grid xs={24} md={7}>
                                <Card.Content style={{}}>
                                    <img
                                        style={imgStyle}
                                        src='http://pukar.org.in/wp-content/uploads/2018/09/male-placeholder.jpg'
                                        alt='Not found'
                                    />
                                    <br />
                                    <Text
                                        h2
                                        style={{
                                            display: 'block',
                                            textAlign: 'center',
                                            // /
                                        }}>
                                        {data.name}
                                    </Text>
                                    <Text
                                        i
                                        h6
                                        style={{
                                            display: 'block',
                                            marginLeft: '5.5em',
                                        }}>
                                        Ph:
                                        {phone}
                                    </Text>
                                    <Text
                                        i
                                        h6
                                        style={{
                                            display: 'block',
                                            marginLeft: '5.5em',
                                        }}>
                                        City:
                                        {city}
                                    </Text>
                                </Card.Content>
                            </Grid>

                            <Grid xs={24} md={17}>
                                <Card.Content>
                                    <Card.Content>
                                        <Text h2 b>
                                            {data.title}
                                        </Text>
                                    </Card.Content>
                                    <Divider x={0} />
                                    <Text>{data.desc}</Text>
                                    <Text h3 style={{ color: '#1597E5' }}>
                                        Expected Salary: &#8377;{data.salary}
                                    </Text>
                                    <Text h3 style={{ color: priorityColor }}>
                                        Priority: {data.priority}
                                    </Text>

                                    <>
                                        {auth.currentUser &&
                                        auth.currentUser.uid !== null ? (
                                            <>
                                                <Button
                                                    shadow
                                                    type='secondary'
                                                    style={{
                                                        backgroundColor:
                                                            '#25D366',
                                                        borderColor: '#25D366',
                                                        borderRadius: '100px',
                                                    }}>
                                                    <img
                                                        src='https://cdn-icons.flaticon.com/png/512/3536/premium/3536445.png?token=exp=1634404252~hmac=a3c0692edc1584da87076cabc07bcbc7'
                                                        style={{
                                                            height: '25px',
                                                            marginBottom:
                                                                '10px',
                                                            marginRight: '10px',
                                                        }}
                                                        alt=''
                                                    />
                                                    <Text h5>Whatsapp</Text>
                                                </Button>
                                                <Spacer />
                                                <Button
                                                    shadow
                                                    type='secondary'
                                                    style={{
                                                        backgroundColor:
                                                            '#FF3F00',
                                                        borderColor: '#FF3F00',
                                                        borderRadius: '100px',
                                                    }}>
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/732/732200.png'
                                                        style={{
                                                            height: '25px',
                                                            marginBottom:
                                                                '10px',
                                                        }}
                                                        alt=''
                                                    />
                                                    <Text h5>Mail Me</Text>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Text p>
                                                    Login to get more
                                                    information...
                                                </Text>
                                            </>
                                        )}
                                    </>
                                    <Spacer h={0.5} />
                                </Card.Content>
                            </Grid>
                        </Grid.Container>
                    </Card>
                </>
            )}
        </BasePage>
    );
}

export default Job;

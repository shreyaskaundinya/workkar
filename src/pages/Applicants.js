import React, { useEffect, useState } from 'react';
import { BasePage } from '../utils/globalStyles';
import { app, auth, db } from '../firebaseSetup.js';
import {
    Button,
    Modals,
    Loading,
    Spacer,
    Table,
    Text,
    Toggle,
    useModal,
    useToasts,
    User,
    Grid,
    Rating,
    Modal,
} from '@geist-ui/react';
import {
    getDocs,
    updateDoc,
    collection,
    query,
    where,
    doc,
    arrayRemove,
} from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Star } from '@geist-ui/react-icons';

function Applicants(props) {
    const [, setToast] = useToasts();
    const [locked, setLocked] = useState(1);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const { jobID } = useParams();
    const { visible, setVisible, bindings } = useModal();

    // const { visible, setVisible, bindings } = useModal();

    const userId = auth?.currentUser;

    const { isLoading, isError, data, refetch } = useQuery(
        'applicants',
        async () => {
            const q = query(collection(db, 'jobList'));
            const querySnap = await getDocs(q);
            return Array(
                ...querySnap.docs
                    .map((item) => {
                        return { ...item.data(), id: item.id };
                    })
                    .filter((item) => item.id === jobID)
            )[0]?.applicants;
        }
    );

    const userIds = data;

    const { isIdle, data: usersDetails } = useQuery(
        ['projects', userId],
        async () => {
            const q = query(
                collection(db, 'userDetails'),
                where('userid', 'in', userIds)
            );
            const querySnap = await getDocs(q);
            return Array(
                ...querySnap.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        },
        {
            // The query will not execute until the userIds exists
            enabled: !!userIds,
        }
    );

    const renderReviews = (value, rowData, index) => {
        return (
            <>
                <Modal {...bindings}>
                    <Modal.Title>{rowData.name}</Modal.Title>
                    <Modal.Subtitle>{rowData.phoneNumber}</Modal.Subtitle>
                    <Modal.Content>
                        <p>
                            Rating :
                            {rowData.length > 0
                                ? rowData.rating.reduce((a, b) => a + b) /
                                  rowData.rating.length
                                : 0}
                        </p>
                    </Modal.Content>
                    <Modal.Action passive onClick={() => setVisible(false)}>
                        Close
                    </Modal.Action>
                </Modal>
                <Button
                    type='success-light'
                    auto
                    onClick={() => setVisible(true)}>
                    View
                </Button>
            </>
        );
    };

    const renderAccept = (value, rowData, index) => {
        const acceptApplication = () => {
            updateDoc(doc(db, 'jobList', jobID), {
                isAssigned: true,
                assignedName: rowData.name,
                assignedid: rowData.userid,
            })
                .then(() => {
                    const click = () =>
                        setToast({ text: `Work assigned to ${rowData.name}` });
                    click();
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        return (
            <Button
                auto
                style={{ backgroundColor: '#6Ecb63', color: 'white' }}
                onClick={acceptApplication}>
                Accept
            </Button>
        );
    };

    const renderDecline = (value, rowData, index) => {
        const rejectApplication = () => {
            updateDoc(doc(db, 'jobList', jobID), {
                applicants: arrayRemove(rowData.userid),
            })
                .then(() => {
                    refetch();
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        return (
            <Button
                auto
                style={{ backgroundColor: '#FF0000', color: 'white' }}
                onClick={rejectApplication}>
                Decline
            </Button>
        );
    };

    var getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    const renderDistance = (value, rowData, index) => {
        function distance(lat1, lon1, lat2, lon2, unit) {
            if (lat1 === lat2 && lon1 === lon2) {
                return 0;
            } else {
                var radlat1 = (Math.PI * lat1) / 180;
                var radlat2 = (Math.PI * lat2) / 180;
                var theta = lon1 - lon2;
                var radtheta = (Math.PI * theta) / 180;
                var dist =
                    Math.sin(radlat1) * Math.sin(radlat2) +
                    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = (dist * 180) / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit === 'K') {
                    dist = dist * 1.609344;
                }
                if (unit === 'N') {
                    dist = dist * 0.8684;
                }
                return Math.floor(dist);
            }
        }

        const dis = distance(
            lat,
            lon,
            rowData.location.lat,
            rowData.location.lon,
            'K'
        );

        return <Text>{dis} Km</Text>;
    };
    const renderRating = (value, rowData, index) => {
        return (
            <>
                <Star fill='yellow' />
                <Text p style={{ marginLeft: '5px' }}>
                    {rowData.length > 0
                        ? rowData.rating.reduce((a, b) => a + b) /
                          rowData.rating.length
                        : 0}
                </Text>
            </>
        );
    };

    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Applicants for this job:
            </Text>
            <Spacer h={2} />
            {isLoading ? (
                <Loading />
            ) : (
                <Table data={usersDetails}>
                    <Table.Column prop='name' label='Name' />
                    <Table.Column
                        prop='distance'
                        label='Distance'
                        render={renderDistance}
                    />
                    <Table.Column
                        prop='rating'
                        label='Rating'
                        render={renderRating}
                    />

                    <Table.Column
                        prop='accept'
                        label='Accept'
                        render={renderAccept}
                    />
                    <Table.Column
                        prop='decline'
                        label='Decline'
                        render={renderDecline}
                    />
                    <Table.Column
                        prop='reviews'
                        label='View Reviews'
                        render={renderReviews}
                    />
                </Table>
            )}
        </BasePage>
    );
}

export default Applicants;

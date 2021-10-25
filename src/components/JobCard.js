import {
    Card,
    Divider,
    Tag,
    Text,
    User,
    Grid,
    useTheme,
    Button,
    Spacer,
    useToasts,
} from '@geist-ui/react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import UserImage from '../assets/images/user.jpg';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../firebaseSetup';
// import Fridge from '../assets/images/fridge.jpeg';

function JobCard({ details }) {
    const { palette } = useTheme();
    const history = useHistory();
    const tagType = (() => {
        var type = 'success';
        switch (details.priority) {
            case 'high':
                type = 'danger';
                break;
            case 'med':
                type = 'warning';
                break;
            case 'low':
                type = 'success';
                break;
            default:
                type = 'success';
                break;
        }
        return type;
    })();
    const [toasts, setToast] = useToasts();

    const handleAddApplicant = () => {
        const user = auth?.currentUser.uid;
        updateDoc(doc(db, 'jobList', details.id), {
            applicants: arrayUnion(user),
        })
            .then(() => {
                const click = () => {
                    setToast({
                        text: 'Applied for job!',
                    });
                };
                click();
            })
            .catch((error) => console.log(error));
    };

    return (
        <Card width='100%' hoverable>
            <Card.Content>
                <Text
                    h5
                    onClick={() => {
                        var jobId = details.id;
                        history.push(`/job/${jobId}`);
                    }}>
                    {details.title}
                </Text>
                <Text p style={{ color: palette.cyanDark }}>
                    Rs. {details.salary}
                </Text>
                <Grid.Container gap={1}>
                    {details.tags.map(
                        (tag, i) =>
                            tag &&
                            tag !== '' &&
                            i < 5 && (
                                <Grid key={i}>
                                    <Tag type='success'>{tag}</Tag>
                                </Grid>
                            )
                    )}
                </Grid.Container>
            </Card.Content>
            <Divider y={0} />

            <Card.Content>
                <User src={UserImage} name={details} />
                <Spacer />
                <PosterDetails>
                    <Button
                        type='success-light'
                        auto
                        onClick={handleAddApplicant}>
                        Apply Now!
                    </Button>
                    <Tag type='success'>{details.priority}</Tag>
                </PosterDetails>
            </Card.Content>
        </Card>
    );
}

export default JobCard;

const PosterDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.95em;
`;

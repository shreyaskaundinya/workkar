import {
    Button,
    Card,
    Divider,
    Input,
    Note,
    Select,
    Spacer,
    Text,
    Textarea,
    useToasts,
} from '@geist-ui/react';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { BasePage } from '../utils/globalStyles';
import { auth, db } from '../firebaseSetup.js';
import { addDoc, collection } from 'firebase/firestore';
import useResponsiveWindow from '../hooks/useResponsiveWindow';

function PostJob() {
    const [formData, setFormData] = useState({});
    const { isMobile, isTablet } = useResponsiveWindow();
    const [toast, setToast] = useToasts();
    const formRef = useRef();

    const handlePriority = (val) => {
        setFormData({ ...formData, priority: val });
    };

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'tags':
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value.split(' '),
                });
                break;

            default:
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (String(this.state.phone).length > 12) {
            setToast({
                text: 'Error : Phone number invalid...',
                type: 'danger',
            });
        } else if (auth.currentUser && auth.currentUser.uid !== null) {
            addDoc(collection(db, 'jobList'), {
                ...formData,
                userid: auth.currentUser.uid,
                applicants: [],
                assignedName: '',
                assignedid: '',
                isAssigned: false,
                isComplete: false,
            })
                .then(() => {
                    formRef.current.reset();
                    setToast({
                        text: 'Posted new job succesfully!',
                        type: 'success',
                    });
                })
                .catch((error) =>
                    setToast({
                        text: `Error: ${error.code}`,
                        type: 'danger',
                    })
                );
        } else {
        }
    };

    return (
        <BasePage>
            <Text h1 style={{ textAlign: 'center' }}>
                Post a new job!
            </Text>
            {auth.currentUser && auth.currentUser.uid !== null ? (
                <>
                    <Form ref={formRef}>
                        <Card
                            width={
                                isMobile
                                    ? '300px'
                                    : isTablet
                                    ? '400px'
                                    : '600px'
                            }>
                            <Card.Content>
                                <Text h3>New Job Post</Text>
                            </Card.Content>
                            <Divider />
                            <Card.Content>
                                <Input
                                    label='Title'
                                    placeholder='Title'
                                    name='title'
                                    clearable
                                    width={'100%'}
                                    required
                                    onChange={handleChange}
                                />
                                <Spacer />
                                <Input
                                    label='Price/Salary'
                                    placeholder='Price'
                                    name='salary'
                                    clearable
                                    width={'100%'}
                                    required
                                    onChange={handleChange}
                                />
                                <Spacer />
                                <Textarea
                                    placeholder='Please enter a description.'
                                    required
                                    width={'100%'}
                                    onChange={handleChange}
                                    name='desc'
                                />
                                <Spacer />
                                <Select
                                    placeholder='Choose one'
                                    onChange={handlePriority}
                                    name='priority'>
                                    <Select.Option value='low'>
                                        Low
                                    </Select.Option>
                                    <Select.Option value='med'>
                                        Medium
                                    </Select.Option>
                                    <Select.Option value='high'>
                                        High
                                    </Select.Option>
                                </Select>
                                <Spacer />
                                <Textarea
                                    placeholder='Enter space separated tags [These tags will be used to help refine search results]'
                                    width={'100%'}
                                    maxLength={30}
                                    rows={2}
                                    name='tags'
                                    required
                                    onChange={handleChange}
                                />
                            </Card.Content>
                            <Divider />
                            <Card.Content>
                                <Button
                                    width={'100%'}
                                    type='success'
                                    onClick={handleSubmit}>
                                    Post!
                                </Button>
                            </Card.Content>
                        </Card>
                    </Form>
                </>
            ) : (
                <>
                    <Note>Login to post a job!</Note>
                </>
            )}
        </BasePage>
    );
}

export default PostJob;

const Form = styled.form`
    display: grid;
    place-items: center;
`;

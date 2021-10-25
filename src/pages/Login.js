import {
    Button,
    Input,
    Page,
    Text,
    Grid,
    Spacer,
    Card,
    Divider,
} from '@geist-ui/react';
import React from 'react';
import { app, auth, db } from '../firebaseSetup.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { BasePage } from '../utils/globalStyles.js';
import { addDoc, collection } from 'firebase/firestore';
import { withRouter } from 'react-router-dom';

const logInDiv = {
    width: '100%',
    border: '2px',
    // marginLeft: '5rem',
    // marginTop: '5rem',
    display: 'inline-flex',
    flexDirection: 'column',
    padding: '2rem',
    margin: 'auto',
    marginRight: '5rem',
    textAlign: 'center',
    boxShadow:
        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
};
const signUpDiv = {
    width: '100%',
    border: '2px',
    // marginLeft: '5rem',
    // marginTop: '5rem',
    display: 'inline-flex',
    flexDirection: 'column',
    padding: '2rem',
    margin: 'auto',
    marginRight: '5rem',
    textAlign: 'center',
    boxShadow:
        'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
};

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            phoneNumber: '',
            name: '',
            userID: '',
            location: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    ...this.state,
                    location: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                });
            });
        }
        return Promise.resolve('');
    }

    signIn() {
        const signInPromise = signInWithEmailAndPassword(
            auth,
            this.state.email,
            this.state.password
        );
        signInPromise
            .then(() => {
                console.log('SUPPOSED TO REDIRECT');
                this.props.history.push({
                    pathname: '/',
                });
            })
            .catch(() => alert('Try Again'));
    }

    signUp() {
        const signUpPromise = createUserWithEmailAndPassword(
            auth,
            this.state.email,
            this.state.password
        );
        signUpPromise
            .then((userCred) => {
                const user = userCred.user;
                addDoc(collection(db, 'userDetails'), {
                    userid: user.uid,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    name: this.state.name,
                    rating: [],
                    location: this.state.location,
                })
                    .then(() => {
                        this.signIn();
                    })
                    .catch((error) => {
                        console.log(error.code);
                    });
            })
            .catch((error) => alert(error));
    }

    componentDidMount() {
        this.getLocation();
    }

    render() {
        return (
            <BasePage className='log-in-div'>
                <Grid.Container
                    gap={2}
                    justify='center'
                    style={{ margin: 'auto', maxWidth: '960px' }}>
                    <Grid xs={24} md={12} lg={12} xl={12}>
                        <Card width={'100%'}>
                            <Card.Content>
                                <Text h2>Log-In</Text>
                                <Divider />
                                <Input
                                    label='Email'
                                    placeholder=''
                                    id='email-input'
                                    name='email'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Input.Password
                                    label='Password'
                                    initialValue=''
                                    id='pass-input'
                                    name='password'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Button
                                    id='signUp'
                                    onClick={this.signIn}
                                    width={'100%'}
                                    type='success-light'>
                                    Login
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid>
                    <Grid xs={24} md={12} lg={12} xl={12}>
                        <Card width={'100%'}>
                            <Card.Content>
                                <Text h2>Sign-Up</Text>
                                <Divider />
                                <Input
                                    label='Email'
                                    placeholder=''
                                    id='email-input'
                                    name='email'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Input
                                    label='Name'
                                    initialValue=''
                                    id='pass-input'
                                    name='name'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Input
                                    label='Phone Number'
                                    initialValue=''
                                    id='phone'
                                    name='phoneNumber'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Input.Password
                                    label='Password'
                                    initialValue=''
                                    id='pass-input'
                                    name='password'
                                    width={'100%'}
                                    onChange={this.handleChange}
                                />
                                <Spacer h={2} />
                                <Button
                                    id='signUp'
                                    onClick={this.signUp}
                                    width={'100%'}
                                    type='success-light'>
                                    Sign Up
                                </Button>
                            </Card.Content>
                        </Card>
                    </Grid>
                </Grid.Container>
            </BasePage>
        );
    }
}
export default withRouter(Login);

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux';

import { loginUser } from '../store/actions/user';

GoogleSignin.configure({
    webClientId: '329512022623-vpn4d3qqnv3thc70cmpsfbrns7fu2hat.apps.googleusercontent.com',
});

const userCollection = firestore().collection('users');

import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

import Logo from '../assets/images/HM_Logo.svg';

import Colors from '../constants/colors';

const SignUpScreen = (props) => {
    const { navigation } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(0);
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();

    const goBackHandler = () => {
        navigation.pop(2);
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const googleSignInHandler = () => {
        GoogleSignin.signIn().then(googleAccount => {
            userCollection
                .where('email', '==', googleAccount.user.email)
                .get()
                .then(checkUser => {
                    if (!checkUser.empty) {
                        setError(1);
                        setErrorText('*An account already exists with the same email address but different sign-in credentials')
                    } else {
                        setError(0);
                        setErrorText('')
                        const googleCredential = auth.GoogleAuthProvider.credential(googleAccount.idToken);
                        auth().signInWithCredential(googleCredential)
                            .then(res => {
                                console.log(res);

                                const {
                                    user: {
                                        _user: {
                                            displayName,
                                            email,
                                            photoURL,
                                            uid
                                        }
                                    }
                                } = res;

                                userCollection
                                    .doc(uid)
                                    .set({
                                        first_name: displayName,
                                        last_name: '',
                                        username: null,
                                        email: email,
                                        photoURL: photoURL,
                                        provider: 'google'
                                    })
                                    .then(() => {
                                        dispatch(loginUser({
                                            user_id: uid,
                                            first_name: displayName,
                                            last_name: '',
                                            username: null,
                                            email: email,
                                            photoURL: photoURL
                                        }));

                                        navigation.navigate('Home');
                                    })
                                    .catch(err => console.log(err));

                                setError(0);
                                setErrorText('');
                            })
                            .catch(() => {
                                setError(1);
                                setErrorText('*An account already exists with the same email address but different sign-in credentials')
                            })
                    }
                })
        }).catch(() => {
            setError(1)
            setErrorText('*Something went wrong')
        })
    };

    const facebookSignInHandler = () => {
        LoginManager.logInWithPermissions(['public_profile', 'email'])
            .then(() => {
                AccessToken.getCurrentAccessToken()
                    .then(facebookData => {
                        if (facebookData) {
                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                    setError(1);
                                    setErrorText('*Something went wrong');
                                } else {
                                    const {
                                        email,
                                        first_name,
                                        last_name,
                                        picture: {
                                            data: {
                                                url: profilePic
                                            }
                                        }
                                    } = result;

                                    userCollection
                                        .where('email', '==', email)
                                        .get()
                                        .then(checkUser => {
                                            if (!checkUser.empty) {
                                                setError(1);
                                                setErrorText('*An account already exists with the same email address but different sign-in credentials')
                                            } else {
                                                setError(0);
                                                setErrorText('');

                                                const facebookCredential = auth.FacebookAuthProvider.credential(facebookData.accessToken);
                                                auth().signInWithCredential(facebookCredential)
                                                    .then(res => {
                                                        userCollection
                                                            .doc(res.user.uid)
                                                            .set({
                                                                first_name: first_name,
                                                                last_name: last_name,
                                                                username: null,
                                                                email: email,
                                                                photoURL: profilePic,
                                                                provider: 'facebook'
                                                            })
                                                            .then(() => {
                                                                dispatch(loginUser({
                                                                    user_id: res.user.uid,
                                                                    first_name: first_name,
                                                                    last_name: last_name,
                                                                    username: null,
                                                                    email: email,
                                                                    photoURL: profilePic
                                                                }));

                                                                navigation.navigate('Home');
                                                            })
                                                            .catch(err => console.log(err));

                                                        setError(0);
                                                        setErrorText('');
                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                            }
                                        })
                                }
                            }

                            const infoRequest = new GraphRequest(
                                '/me',
                                {
                                    accessToken: facebookData.accessToken,
                                    parameters: {
                                        fields: {
                                            string: 'email, first_name, last_name, picture'
                                        }
                                    }
                                },
                                responseInfoCallback
                            );
                            new GraphRequestManager().addRequest(infoRequest).start()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            .catch(err => {
                console.log(err)
            })
    }

    const inputHandler = (e, name) => {
        switch (name) {
            case 'firstName':
                setFirstName(e);
                break;
            case 'lastName':
                setLastName(e);
                break;
            case 'username':
                setUsername(e);
                break;
            case 'email':
                setEmail(e);
                break;
            case 'password':
                setPassword(e);
                break;
        }
    }

    const submitHandler = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                const {
                    user: {
                        _user: {
                            uid
                        }
                    }
                } = res;

                userCollection
                    .doc(uid)
                    .set({
                        first_name: firstName,
                        last_name: lastName,
                        username: username,
                        email: email,
                        photoURL: null,
                        provider: 'email'
                    })
                    .then(() => {
                        dispatch(loginUser({
                            user_id: uid,
                            first_name: firstName,
                            last_name: lastName,
                            username: username,
                            email: email,
                            photoURL: null
                        }));

                        navigation.navigate('Home');
                    })
                    .catch(err => console.log(err))

                setErrorText('');
                setError(0);
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setError(1)
                    setErrorText('*That email address is already in use');
                } else {
                    setError(2);
                    setErrorText('*Please enter a valid email and password');
                }
            })
    }

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" />
            <GestureRecognizer
                onSwipeDown={goBackHandler}
                config={config}
                style={{
                    flex: 1,
                }}>
                <View style={styles.container}>
                    <View style={styles.nudgeContainer}>
                        <TouchableOpacity onPress={goBackHandler}>
                            <View style={styles.nudge} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Logo width={120} height={50} />
                    </View>
                    <View style={styles.createAccountContainer}>
                        <Text style={styles.createAccount}>Create an account</Text>
                    </View>
                    {error > 0 &&
                        <View style={[styles.inputGroup, styles.errorContainer]}>
                            <Text style={styles.error}>{errorText}</Text>
                        </View>
                    }
                    <View style={styles.inputContainer}>
                        <View style={[styles.inputGroup, styles.nameContainer]}>
                            <View style={{ width: '48%' }}>
                                <TextInput
                                    placeholder="First Name"
                                    placeholderTextColor={Colors.grey}
                                    style={styles.input}
                                    onChangeText={(e) => inputHandler(e, 'firstName')}
                                />
                            </View>
                            <View style={{ width: '48%' }}>
                                <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor={Colors.grey}
                                    style={styles.input}
                                    onChangeText={(e) => inputHandler(e, 'lastName')}
                                />
                            </View>
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
                                onChangeText={(e) => inputHandler(e, 'username')}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
                                onChangeText={(e) => inputHandler(e, 'email')}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(e) => inputHandler(e, 'password')}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Button
                            title="Sign up"
                            style={{
                                backgroundColor: Colors.blue,
                                width: 110,
                                height: 40,
                            }}
                            color="#ffffff"
                            onPress={submitHandler}
                        />
                    </View>
                    <View style={styles.separator}>
                        <View style={[styles.hr, { marginRight: 15 }]} />
                        <View>
                            <Text
                                style={{
                                    fontFamily: 'Lato-Regular',
                                    color: Colors.blue,
                                    fontSize: 16,
                                }}>
                                or
                            </Text>
                        </View>
                        <View style={[styles.hr, { marginLeft: 15 }]} />
                    </View>
                    <View>
                        <View style={{ marginBottom: 15 }}>
                            <SocialButton title="Sign up with Google" onPress={googleSignInHandler} />
                        </View>
                        <View>
                            <SocialButton title="Sign up with Facebook" onPress={facebookSignInHandler} />
                        </View>
                    </View>
                    <View style={styles.termsContainer}>
                        <View>
                            <Text style={styles.terms}>By signing up, you agree to the</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Text
                                    style={[
                                        styles.terms,
                                        {
                                            borderBottomWidth: 0.5,
                                            borderBottomColor: Colors.blue,
                                            marginTop: 3,
                                        },
                                    ]}>
                                    Terms of Service and Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.signupContainer}>
                        <View>
                            <Text style={styles.signup}>Already have an account? </Text>
                        </View>
                        <View>
                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate('Login')}
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: Colors.blue,
                                }}>
                                <Text style={styles.signup}>Log in</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </GestureRecognizer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    nudgeContainer: {
        position: 'absolute',
        top: 15,
    },
    nudge: {
        width: 40,
        height: 8,
        borderRadius: 10,
        backgroundColor: Colors.lightGrey,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputGroup: {
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 15,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        height: 40,
    },
    separator: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 35,
        alignItems: 'center',
        marginVertical: 15,
    },
    hr: {
        height: 1,
        backgroundColor: Colors.lightGrey,
        flexGrow: 1,
    },
    continueGuest: {
        fontFamily: 'Lato-Light',
        fontSize: 16,
        color: Colors.blue,
    },
    signupContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signup: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.blue,
    },
    createAccountContainer: {
        marginVertical: 25,
    },
    createAccount: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.blue,
    },
    termsContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    terms: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.blue,
    },
    error: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.red
    }
});

export default SignUpScreen;

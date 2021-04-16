import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import { AccessToken, LoginManager, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux';

import { loginUser } from '../store/actions/user';

const userCollection = firestore().collection('users');

GoogleSignin.configure({
    webClientId:
        '329512022623-vpn4d3qqnv3thc70cmpsfbrns7fu2hat.apps.googleusercontent.com',
});

import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

import Logo from '../assets/images/HM_Logo.svg';

import Colors from '../constants/colors';

const validateEmail = email => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return (true)
    }
    return (false)
}

const LoginScreen = (props) => {
    const { navigation } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(0);
    const [errorText, setErrorText] = useState('');

    const dispatch = useDispatch();

    const goBackHandler = () => {
        navigation.goBack();
    };

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
    };

    const googleSignInHandler = () => {
        GoogleSignin.signIn().then(googleAccount => {
            userCollection
                .where('email', '==', googleAccount.user.email)
                .where('provider', '==', 'google')
                .get()
                .then(checkUser => {
                    if (checkUser.empty) {
                        setError(1);
                        setErrorText('*The email address is already in use')
                    } else {
                        checkUser.forEach(user => {
                            dispatch(loginUser({
                                user_id: user.id,
                                first_name: user._data.first_name,
                                last_name: user._data.last_name,
                                username: user._data.username,
                                email: user._data.email,
                                photoURL: user._data.photoURL
                            }));

                            navigation.navigate('Home');
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    setError(1)
                    setErrorText('*Something went wrong')
                })
        }).catch(err => {
            console.log(err)
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
                                        .where('provider', '==', 'facebook')
                                        .get()
                                        .then(checkUser => {
                                            if (checkUser.empty) {
                                                setError(1);
                                                setErrorText('*The email address is already in use')
                                            } else {
                                                checkUser.forEach(user => {
                                                    dispatch(loginUser({
                                                        user_id: user.id,
                                                        first_name: user._data.first_name,
                                                        last_name: user._data.last_name,
                                                        username: user._data.username,
                                                        email: user._data.email,
                                                        photoURL: user._data.photoURL
                                                    }));

                                                    navigation.navigate('Home');
                                                })
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            setError(1)
                                            setErrorText('*Something went wrong')
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

    const signInHandler = () => {
        if (validateEmail(username)) {
            auth()
                .signInWithEmailAndPassword(username, password)
                .then(
                    ({
                        user: {
                            _user: { uid },
                        },
                    }) => {
                        console.log(uid)
                        setError(0);
                        setErrorText('');
                        userCollection
                            .doc(uid)
                            .get()
                            .then(({ _data }) => {

                                let {
                                    email,
                                    first_name,
                                    last_name,
                                    username,
                                    photoURL
                                } = _data;

                                dispatch(loginUser({
                                    user_id: uid,
                                    first_name: first_name,
                                    last_name: last_name,
                                    username: username,
                                    email: email,
                                    photoURL: photoURL
                                }));

                                navigation.navigate('Home');
                            })
                            .catch(err => console.log(err))
                    },
                )
                .catch(err => {
                    console.log(err)
                    setError(1);
                    setErrorText('*Username or password is invalid');
                });
        } else {
            userCollection
                .where('username', '==', username).get()
                .then(res => {
                    console.log(res.empty)
                    if (res.empty) {
                        setError(1);
                        setErrorText('*Username or password is invalid');
                    } else {
                        setError(0);
                        setErrorText('');

                        res.forEach(doc => {
                            let {
                                email,
                                first_name,
                                last_name,
                                photoURL,
                                username
                            } = doc.data();

                            auth()
                                .signInWithEmailAndPassword(email, password)
                                .then(() => {
                                    dispatch(loginUser({
                                        user_id: doc.id,
                                        first_name: first_name,
                                        last_name: last_name,
                                        username: username,
                                        email: email,
                                        photoURL: photoURL
                                    }));

                                    setError(0);
                                    setErrorText('');

                                    navigation.navigate('Home');
                                })
                                .catch(() => {
                                    setError(1);
                                    setErrorText('*Username or password is invalid');
                                })
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    };

    const inputHandler = (e, name) => {
        switch (name) {
            case 'username':
                setUsername(e);
                break;
            case 'password':
                setPassword(e);
                break;
        }
    };

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
                    <View style={styles.nudeContainer}>
                        <TouchableOpacity onPress={goBackHandler}>
                            <View style={styles.nudge} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Logo width={120} height={50} />
                    </View>
                    <View style={styles.inputContainer}>
                        {error > 0 && (
                            <View style={[styles.inputGroup, styles.errorContainer]}>
                                <Text style={styles.error}>{errorText}</Text>
                            </View>
                        )}
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder="Username or Email"
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
                                onChangeText={(e) => inputHandler(e, 'username')}
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
                        <View style={[styles.inputGroup, { marginLeft: 5 }]}>
                            <TouchableOpacity>
                                <Text style={styles.forgot}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Button
                            title="Log in"
                            style={{
                                backgroundColor: Colors.blue,
                                width: 110,
                                height: 40,
                            }}
                            color="#ffffff"
                            onPress={signInHandler}
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
                            <SocialButton
                                title="Log in with Google"
                                onPress={googleSignInHandler}
                            />
                        </View>
                        <View>
                            <SocialButton
                                title="Log in with Facebook"
                                onPress={facebookSignInHandler}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.continueGuest}>
                                Continue as guest for now
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupContainer}>
                        <View>
                            <Text style={styles.signup}>No account yet?</Text>
                        </View>
                        <View>
                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signup}> Sign up now!</Text>
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
    nudeContainer: {
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
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
    },
    inputGroup: {
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 15,
    },
    input: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        height: 40,
    },
    forgot: {
        fontFamily: 'Lato-Light',
        fontSize: 16,
        color: Colors.blue,
        alignSelf: 'flex-start',
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
    error: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.red,
    },
});

export default LoginScreen;

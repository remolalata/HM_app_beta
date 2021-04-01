import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

import Logo from '../assets/images/HM_Logo.svg';

import Colors from '../constants/colors';

const LoginScreen = props => {
    const { navigation } = props;

    console.log(props);

    const goBackHandler = () => {
        navigation.goBack();
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <SafeAreaView style={styles.screen}>
            <StatusBar
                backgroundColor='rgba(0, 0, 0, 0.2)'
            />
            <GestureRecognizer
                onSwipeDown={goBackHandler}
                config={config}
                style={{
                    flex: 1
                }}
            >
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
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder='Username or Email'
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={Colors.grey}
                                style={styles.input}
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
                            title='Log in'
                            style={{
                                backgroundColor: Colors.blue,
                                width: 110,
                                height: 40
                            }}
                            color='#ffffff'
                        />
                    </View>
                    <View style={styles.separator}>
                        <View style={[styles.hr, { marginRight: 15 }]} />
                        <View>
                            <Text
                                style={{
                                    fontFamily: 'Lato-Regular',
                                    color: Colors.blue,
                                    fontSize: 16
                                }}
                            >or</Text>
                        </View>
                        <View style={[styles.hr, { marginLeft: 15 }]} />
                    </View>
                    <View>
                        <View style={{ marginBottom: 15 }}>
                            <SocialButton title='Log in with Google' />
                        </View>
                        <View>
                            <SocialButton title='Log in with Facebook' />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TouchableOpacity>
                            <Text style={styles.continueGuest}>Continue as guest for now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signupContainer}>
                        <View>
                            <Text style={styles.signup}>No account yet?</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.signup}> Sign up now!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </GestureRecognizer>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    nudeContainer: {
        position: 'absolute',
        top: 15,
    },
    nudge: {
        width: 40,
        height: 8,
        borderRadius: 10,
        backgroundColor: Colors.lightGrey
    },
    inputContainer: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center'
    },
    inputGroup: {
        width: '100%',
        paddingHorizontal : 25,
        marginBottom: 15
    },
    input: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        height: 40
    },
    forgot: {
        fontFamily: 'Lato-Light',
        fontSize: 16,
        color: Colors.blue,
        alignSelf: 'flex-start'
    },
    separator: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 35,
        alignItems: 'center',
        marginVertical: 15
    },
    hr: {
        height: 1,
        backgroundColor: Colors.lightGrey,
        flexGrow: 1
    },
    continueGuest: {
        fontFamily: 'Lato-Light',
        fontSize: 16,
        color: Colors.blue
    },
    signupContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signup: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.blue
    }
});

export default LoginScreen;
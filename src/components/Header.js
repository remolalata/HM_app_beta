import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '329512022623-vpn4d3qqnv3thc70cmpsfbrns7fu2hat.apps.googleusercontent.com',
});

import Logo from '../assets/images/HM_Logo.svg';

import Colors from '../constants/colors';

import { loginUser, logoutUser } from '../store/actions/user';

const Header = (props) => {
    const { goToProfile, goToLogin, goBack } = props;

    const user = useSelector((state) => state.user.user);

    console.log(user)

    const dispatch = useDispatch();

    const googleLogin = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return auth().signInWithCredential(googleCredential);
        } catch (e) {
            console.log(e)
        }
    }

    const googleLoginHandler = () => {
        googleLogin()
            .then(({ user }) => {
                const {
                    _user
                } = user;

                dispatch(loginUser(_user))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    return (
        <View style={styles.header}>
            <View>
                <Logo width={70} height={30} fill="#39576C" />
            </View>
            {user ?
                <View style={styles.headerAvatarWrapper}>
                    <TouchableWithoutFeedback onPress={goToProfile}>
                    {/* <TouchableWithoutFeedback onPress={logoutHandler}> */}
                        <Image
                            style={styles.headerAvatar}
                            source={require('../assets/images/avatar.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
                :
                <View>
                    <TouchableOpacity onPress={goToLogin}>
                        <Text style={styles.auth}>LOG IN/SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 57,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        top: 0,
        width: '100%',
        position: 'absolute',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerAvatarWrapper: {
        marginRight: 10,
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
    },
    auth: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.blue
    }
});

export default Header;

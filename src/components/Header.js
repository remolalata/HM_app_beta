import React, { useReducer } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    TextInput
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

import SearchBar from '../components/SearchBar';

const Header = (props) => {
    const { goToProfile, goToLogin, goBack } = props;

    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    return (
        <View style={styles.header}>
            <View>
                <Logo width={70} height={30} fill="#39576C" />
            </View>
            {user ?
                <>
                    <View style={styles.searchBar}>
                        <SearchBar />
                    </View>
                    <View style={styles.headerAvatarWrapper}>
                        <TouchableWithoutFeedback onPress={goToProfile}>
                            {user && user.photoURL ?
                                <Image
                                    style={styles.headerAvatar}
                                    source={{ uri: user.photoURL }}
                                />
                                :
                                <Image
                                    style={styles.headerAvatar}
                                    source={require('../assets/images/avatar.png')}
                                />
                            }
                        </TouchableWithoutFeedback>
                    </View>
                </>
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
    },
    searchBar: {
        flexGrow: 1,
        marginHorizontal: 15
    }
});

export default Header;

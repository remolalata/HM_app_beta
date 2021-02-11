import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import Logo from '../assets/images/HM_Logo.svg';

const Header = props => {
    const { onPress, goBack } = props;

    return (
        <View style={styles.header}>
            <View>
                <Logo width={70} height={30} fill="#39576C" />
            </View>
            <View style={styles.headerAvatarWrapper}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <Image
                        style={styles.headerAvatar}
                        source={require('../assets/images/avatar.png')}
                    />
                </TouchableWithoutFeedback>
            </View>
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
        borderTopRightRadius: 10
    },
    headerAvatarWrapper: {
        marginRight: 10,
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
    },
});

export default Header;

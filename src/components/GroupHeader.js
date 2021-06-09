import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TabView, SceneMap } from 'react-native-tab-view';

import SearchBar from './SearchBar';

const GroupHeader = props => {

    const { goToProfileHandler, toggleDrawer } = props;

    return (
        <>
            <View style={styles.header}>
                <View>
                    <TouchableWithoutFeedback onPress={toggleDrawer}>
                        <Icon name="menu" size={30} color='#000000' />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexGrow: 1, marginHorizontal: 15 }}>
                    <SearchBar />
                </View>
                <View>
                    <TouchableWithoutFeedback onPress={goToProfileHandler}>
                        <Image style={styles.headerAvatar} source={require('../assets/images/avatar.png')} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Bakal Bikes</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 57,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        // shadowColor: 'black',
        // shadowOpacity: 0.1,
        // shadowRadius: StyleSheet.hairlineWidth,
        // shadowOffset: {
        //     height: StyleSheet.hairlineWidth,
        //     width: 0,
        // },
        // elevation: 4,
        zIndex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2
    },
    titleWrapper: {
        backgroundColor: '#ffffff',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Lato-Bold',
        color: '#000000',
        fontSize: 16
    }
});

export default GroupHeader;
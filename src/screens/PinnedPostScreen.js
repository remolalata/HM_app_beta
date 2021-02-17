import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import SlidersHorizontal from '../assets/images/SlidersHorizontal.svg';

import Colors from '../constants/colors';

const PinnedPostScreen = props => {
    const { navigation } = props;

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Icon name='chevron-left' size={30} color={Colors.black} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>Pinned Posts</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <SlidersHorizontal width={30} height={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 7.5 }}>
                <View style={[styles.post, styles.activePost]}></View>
                <View style={styles.post}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 57,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
            width: 0,
        },
        elevation: 4,
        zIndex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    },
    post: {
        width: '100%',
        height: 220,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginVertical: 7.5
    },
    activePost: {
        borderWidth: 2,
        borderColor: '#39576C'
    }
})

export default PinnedPostScreen;
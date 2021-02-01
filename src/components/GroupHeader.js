import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const GroupHeader = props => {

    const { goToProfileHandler } = props;

    return (
        <View style={styles.header}>
            <View>
                <TouchableWithoutFeedback>
                    <Icon name="menu" size={30} color='#000000' />
                </TouchableWithoutFeedback>
            </View>
            <View>
                <Text style={styles.title}>Dimagiba Family</Text>
            </View>
            <View>
                <TouchableWithoutFeedback onPress={goToProfileHandler}>
                    <Image style={styles.headerAvatar} source={require('../assets/images/avatar.png')} />
                </TouchableWithoutFeedback>
            </View>
        </View>
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
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
            width: 0,
        },
        elevation: 4,
        zIndex: 1
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2
    },
    title: {
        fontFamily: 'Lato-Bold',
        color: '#000000',
        fontSize: 16
    }
});

export default GroupHeader;
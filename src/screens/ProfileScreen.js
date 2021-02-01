import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

const ProfileScreen = props => {

    const { navigation } = props;

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.closeWrapper}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <Icon name="x" size={25} color={Colors.lightGrey} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={styles.profile}>
                <View>
                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.name}>Robert Hal Dimagiba</Text>
                </View>
                <View>
                    <Text style={styles.username}>@robdimags</Text>
                </View>
                <View>
                    <Text style={styles.bio}>
                        A loving father of 3 wonderful children Dina Mae, Teddy and
                        Gigianna.
                    </Text>
                </View>
            </View>
            <View style={{
                padding: 15,
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
                <View style={[styles.box, { width: '100%' }]}></View>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
                <View style={styles.box}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 57,
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Lato-Bold',
        color: Colors.black,
        fontSize: 16,
    },
    closeWrapper: {
        position: 'absolute',
        right: 25,
    },
    profile: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 115,
        height: 115,
        borderRadius: 115 / 2,
        marginVertical: 15,
    },
    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
    },
    username: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black,
    },
    bio: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black,
        width: 240,
        textAlign: 'center',
        marginTop: 8,
    },
    box: {
        width: '48%',
        height: 188,
        backgroundColor: Colors.lightGrey,
        marginBottom: 15
    },
});

export default ProfileScreen;

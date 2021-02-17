import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';

import { DUMMYUSERS } from '../data/dummy-data';

import Colors from '../constants/colors';

const DrawerMembers = props => {

    const renderItem = ({ item }) => {
        return (
            <View style={styles.memberContainer}>
                <View>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.type}>{item.type}</Text>
                    </View>
                    <View style={[styles.row, { alignItems: 'center' }]}>
                        <Text style={styles.username}>{item.username} {item.id === 1 && '(You)'}</Text>
                        <Text style={styles.bull}>&bull;</Text>
                        <Text style={styles.status}>{item.status}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Members</Text>
            </View>
            <FlatList
                data={DUMMYUSERS}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        marginVertical: 15
    },
    memberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 30/2,
        marginRight: 10
    },
    name: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: Colors.black,
        marginRight: 3
    },
    type: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    username: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black
    },
    status: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: Colors.green
    },
    bull: {
        marginHorizontal: 5,
        fontSize: 12
    }
});

export default DrawerMembers;
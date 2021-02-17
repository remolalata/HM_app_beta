import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const DrawerSubTasks = props => {

    const { navigation, activeRoute } = props;

    console.log(activeRoute)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Group' })}>
                <View style={[styles.label, (activeRoute.screen === 'Group') ? styles.labelActive : '']}>
                    <Text style={[styles.labelText, styles.labelTextActive]}>Feed</Text>
                    <View style={styles.redDot}></View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'PinnedPost' })}>
                <View style={[styles.label, (activeRoute.screen === 'PinnedPost') ? styles.labelActive : '']}>
                    <Text style={styles.labelText}>Pinned Post (2)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Locator</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Family Shopping</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Grocery List</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 25
    },
    label: {
        color: Colors.black,
        height: 25,
        paddingVertical: 5,
        paddingHorizontal: 8,
        marginBottom: 8,
        flexDirection: 'row'
    },
    labelActive: {
        backgroundColor: Colors.lightGrey
    },
    labelText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13,
        color: Colors.black
    },
    labelTextActive: {
        fontFamily: 'Lato-Bold'
    },
    redDot: {
        width: 6,
        height: 6,
        borderRadius: 6 / 2,
        backgroundColor: Colors.red,
        marginLeft: 3
    }
})

export default DrawerSubTasks;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiscoverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Discover</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default DiscoverScreen;
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const CommunitiesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Communities</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    }
})

export default CommunitiesScreen;
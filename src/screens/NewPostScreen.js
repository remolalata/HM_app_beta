import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const NewPostScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>New Post</Text>
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

export default NewPostScreen;
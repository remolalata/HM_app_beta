import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

import Colors from '../constants/colors';

const SocialButton = props => {
    const {
        title,
        onPress
    } = props;

    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 180,
        height: 40,
        borderWidth: 2,
        borderColor: Colors.blue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.blue
    }
});

export default SocialButton;
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

const Button = props => {
    const {
        title,
        style,
        color,
        onPress
    } = props;

    return (
        <TouchableOpacity style={[styles.btn, style]} onPress={onPress}>
            <Text style={[styles.text, { color: color }]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#ffffff'
    }
});

export default Button;
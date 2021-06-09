import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Colors from '../../constants/colors';

const Filter = props => {
    const { name } = props;
    return (
        <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterText}>{name}</Text>
            <Icon name='caretdown' size={10} color={Colors.grey} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    filterBtn: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 20,
        borderRadius: 8
    },
    filterText: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black,
        lineHeight: 20,
        marginRight: 5
    }
});

export default Filter;
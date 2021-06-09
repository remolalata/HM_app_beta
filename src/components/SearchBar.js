import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

const SearchBar = props => {
    return (
        <View style={styles.searchWrapper}>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Search HappyMoppet'
                    style={styles.input}
                    placeholderTextColor={Colors.grey}
                    autoCorrect={false}
                    spellCheck={false}
                    underlineColorAndroid='transparent'
                />
            </View>
            <TouchableOpacity style={styles.searchIcon}>
                <Icon name='search' size={20} color={Colors.grey} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        height: 40,
        paddingLeft: 10,
        paddingRight: 15
    },
    inputWrapper: {
        width: 100,
        marginRight: 10,
        flexGrow: 1
    },
    input: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black,
        width: '100%',
        borderWidth: 0
    },
    searchIcon: {
        width: 20,
        height: 20
    }
});

export default SearchBar;
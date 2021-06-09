import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

import SearchBar from '../components/SearchBar';

const MarketPlaceHeader = props => {
    const { goToProfile, goToLogin, goBack, search } = props;

    const user = useSelector((state) => state.user.user);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back} onPress={goBack}>
                    <Icon name="chevron-left" size={25} color={Colors.black} />
                </TouchableOpacity>
                {search ?
                    <View style={styles.searchBar}>
                        <SearchBar />
                    </View>
                    :
                    <View style={styles.searchBar}>
                        <Text style={styles.title}>Marketplace</Text>
                    </View>
                }

                <View style={styles.headerAvatarWrapper}>
                    <TouchableWithoutFeedback onPress={goToProfile}>
                        {user && user.photoURL ?
                            <Image
                                style={styles.headerAvatar}
                                source={{ uri: user.photoURL }}
                            />
                            :
                            <Image
                                style={styles.headerAvatar}
                                source={require('../assets/images/avatar.png')}
                            />
                        }
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    header: {
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
    },
    back: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        flexGrow: 1,
        marginRight: 15,
        marginLeft: 10,
        alignItems: 'center'
    },
    headerAvatarWrapper: {
        marginRight: 10,
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    }
});

export default MarketPlaceHeader;
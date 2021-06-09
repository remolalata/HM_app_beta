import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/colors';

import StoreFront from '../../assets/images/Storefront.svg';
import StoreFrontActive from '../../assets/images/Storefront-Active.svg';

import { toggleNewPost } from '../../store/actions/modals';
import { setActiveTab } from '../../store/actions/utils';

const CustomTabComponent = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const modals = useSelector((state) => state.modals.newPost);
    const user = useSelector((state) => state.user.user);
    const activeTab = useSelector((state) => state.utils.activeTab);

    const dispatch = useDispatch();

    if (focusedOptions.title === 'Home' && activeTab === 'MARKETPLACE') {
        dispatch(setActiveTab('HOME'));
    }

    const toggleNewPostHandler = (bool) => {
        dispatch(toggleNewPost(bool));
        if (!modals) {
            dispatch(setActiveTab('NEWPOST'))
        } else {
            if (focusedOptions.title === 'Home') {
                dispatch(setActiveTab('HOME'));
            } else {
                dispatch(setActiveTab('MARKETPLACE'));
            }
        }
    };

    const toggleHomeHandler = () => {
        dispatch(setActiveTab('HOME'));

        if (activeTab === 'MARKETPLACE') {
            navigation.navigate('Home');
        } else {
            if (modals) {
                toggleNewPostHandler(true);
            }
        }
    };

    const goToMarketPlace = () => {
        if (modals) {
            toggleNewPostHandler(true);
        }
        dispatch(setActiveTab('MARKETPLACE'))
        navigation.navigate('MarketPlace');
    }

    const toggleDrawer = () => {
        if (user) {
            navigation.toggleDrawer();
        } else {
            navigation.navigate('Login');
        }
    };

    const openNewPost = () => {
        if (user) {
            toggleNewPostHandler(true);
        } else {
            navigation.navigate('Login');
        }
    };

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, modals || activeTab === 'MARKETPLACE' ? '' : styles.tabActive]}
                onPress={toggleHomeHandler}>
                <Icon
                    name="home"
                    size={25}
                    color={modals || activeTab === 'MARKETPLACE' ? Colors.grey : Colors.black}
                />
                <Text
                    style={[
                        styles.tabText,
                        { color: modals || activeTab === 'MARKETPLACE' ? Colors.grey : Colors.black },
                    ]}
                >
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, modals ? styles.tabActive : '']}
                onPress={openNewPost}>
                <Icon
                    name="plus-square"
                    size={25}
                    color={modals ? Colors.black : Colors.grey}
                />
                <Text
                    style={[
                        styles.tabText,
                        { color: modals ? Colors.black : Colors.grey },
                    ]}>
                    New Post
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'MARKETPLACE' ? styles.tabActive : '']}
                onPress={goToMarketPlace}
            >
                {activeTab === 'MARKETPLACE' ? <StoreFrontActive width={25} /> : <StoreFront width={25} />}

                <Text
                    style={[
                        styles.tabText,
                        { color: activeTab === 'MARKETPLACE' ? Colors.black : Colors.grey }
                    ]}
                >
                    Marketplace
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={toggleDrawer}>
                <Icon name="users" size={25} color={Colors.grey} />
                <Text style={styles.tabText}>Groups</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 12,
        zIndex: 1,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
    },
    tabActive: {
        borderTopWidth: 2,
        borderColor: Colors.black,
    },
    tabText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.grey,
        marginTop: 3,
    },
    red: {
        borderColor: 'red',
    },
    blue: {
        borderColor: 'blue',
    },
});

export default CustomTabComponent;

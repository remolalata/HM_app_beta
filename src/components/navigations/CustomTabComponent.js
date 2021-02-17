import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';

const CustomTabComponent = ({ state, descriptors, navigation }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tab, isFocused ? styles.tabActive : '']}
                        key={index.toString()}>
                        {options.title === 'Feed' ? (
                            <Icon name="home" size={25} color={isFocused ? Colors.black : Colors.grey} />
                        ) : (
                                <Icon name="plus-square" size={25} color={isFocused ? Colors.black : Colors.grey} />
                            )}
                        <Text
                            style={[
                                styles.tabText,
                                { color: isFocused ? Colors.black : Colors.grey },
                            ]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
            <TouchableOpacity
                style={styles.tab}
                onPress={() => navigation.toggleDrawer()}>
                <Icon name="users" size={25} color={Colors.grey} />
                <Text style={styles.tabText}>Communities</Text>
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
        borderColor: Colors.black
    },
    tabText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.grey,
        marginTop: 3
    },
});

export default CustomTabComponent;

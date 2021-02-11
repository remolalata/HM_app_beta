import React from 'react';
import { View, Text } from 'react-native';
import { FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import NewPostScreen from '../screens/NewPostScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';

import Colors from '../constants/colors';

import Plus from '../assets/images/Plus.svg';

import { DUMMYGROUP2 } from '../data/dummy-data';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerComponent = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.drawerContainer}>
            <View style={styles.drawerContent}>
                <View style={styles.groups}>
                    <DrawerContentScrollView {...props} keyboardShouldPersistTaps='handled' >
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.groupsTitle}>Your Groups</Text>
                        </View>
                        {DUMMYGROUP2.map(item => (
                            <DrawerItem
                                focused={item.id === 3 ? true : false}
                                activeBackgroundColor={Colors.black}
                                label={({ focused, color }) => {
                                    return (
                                        <>
                                            <View style={[focused ? styles.activeGroup : null, { width: 75, height: 60 }]}>
                                                <Image source={item.image} style={styles.groupImage} />
                                            </View>
                                        </>

                                    )
                                }}
                                style={{ marginLeft: -2, marginRight: 0, marginVertical: -5, }}
                                onPress={() => navigation.navigate('Group')}
                                key={item.id.toString()}
                            />
                        ))}
                        <View style={styles.addGroupContainer}>
                            <TouchableOpacity>
                                <Plus width={25} height={25} />
                            </TouchableOpacity>
                        </View>
                    </DrawerContentScrollView>
                </View>

                <View style={styles.groupContent}>
                    <View style={styles.groupTitleContainer}>
                        <View>
                            <Text style={styles.groupTitle}>Dimagiba Family</Text>
                            <Text style={styles.groupSubTitle}>Family</Text>
                        </View>
                        <View style={styles.moreVertical}>
                            <TouchableOpacity>
                                <Icon name='more-vertical' color={Colors.grey} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        paddingRight: 10,
    },
    drawerContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    groupContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexGrow: 1
    },
    groups: {
        width: 75,
        backgroundColor: Colors.black,
        justifyContent: 'center',
    },
    groupsTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 10,
        color: Colors.lightGrey,
        textAlign: 'center',
    },
    groupImage: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        position: 'relative',
        left: 6,
        top: 6
    },
    activeGroup: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48
    },
    addGroupContainer: {
        width: 42,
        height: 42,
        backgroundColor: '#4e4e4e',
        borderRadius: 42 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: 15,
        marginTop: 15
    },
    groupTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
        paddingLeft: 8
    },
    groupTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    },
    groupSubTitle: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    }
});

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.black,
                inactiveTintColor: Colors.grey,
                labelStyle: {
                    fontFamily: 'Lato-Regular',
                    fontSize: 12,
                    marginBottom: 15,
                },
                style: {
                    height: 70,
                    backgroundColor: '#ffffff',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                },
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'NewPost') {
                        iconName = focused ? 'plus-square' : 'plus-square';
                    } else if (route.name === 'Communities') {
                        iconName = focused ? 'users' : 'users';
                    }

                    return (
                        <Icon
                            name={iconName}
                            size={25}
                            color={color}
                            style={{ marginTop: 10 }}
                        />
                    );
                },
                tabBarButton: (props) => (
                    <TouchableOpacity
                        {...props}
                        style={
                            props.accessibilityState.selected
                                ? [
                                    props.style,
                                    { borderTopColor: Colors.black, borderTopWidth: 2 },
                                ]
                                : props.style
                        }
                    />
                ),
                tabBarVisible: route.name === 'NewPost' ? false : true,
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="NewPost"
                component={NewPostScreen}
                options={{ title: 'New Post' }}
            />
            <Tab.Screen name="Communities" component={CommunitiesScreen} />
        </Tab.Navigator>
    );
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeTabNavigator} />
            <Stack.Screen name="Group" component={GroupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

const HomeDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerType="slide"
            drawerContent={(props) => <CustomDrawerComponent {...props} />}
            drawerStyle={{
                width: '90%',
            }}
            overlayColor={1}>
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
        </Drawer.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <HomeDrawerNavigator />
        </NavigationContainer>
    );
};

export default MainNavigator;

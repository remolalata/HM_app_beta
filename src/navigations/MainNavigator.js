import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewPostScreen from '../screens/NewPostScreen';
import PinnedPostScreen from '../screens/PinnedPostScreen';
import LocatorScreen from '../screens/LocatorScreen';
import FamilyShoppingScreen from '../screens/FamilyShoppingScreen';
import GroceryList from '../screens/GroceryListScreen';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

import CustomTabComponent from '../components/navigations/CustomTabComponent';
import CustomDrawerComponent from '../components/navigations/CustomDrawerComponent';

import { toggleNewPost } from '../store/actions/modals';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTabNavigator = () => {

    const modals = useSelector(state => state.modals.newPost);
    const login = useSelector(state => state.modals);

    const dispatch = useDispatch();

    const toggleNewPostHandler = bool => {
        dispatch(toggleNewPost(bool))
    }

    return (
        <Tab.Navigator
            tabBar={props => <CustomTabComponent {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            />
            <Tab.Screen
                name="NewPost"
                component={NewPostScreen}
                options={{ title: 'New Post' }}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        toggleNewPostHandler(true);
                    },
                }}
            />
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
            <Stack.Screen name='PinnedPost' component={PinnedPostScreen} />
            <Stack.Screen name='Locator' component={LocatorScreen} />
            <Stack.Screen name='FamilyShopping' component={FamilyShoppingScreen} />
            <Stack.Screen name='GroceryList' component={GroceryList} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
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

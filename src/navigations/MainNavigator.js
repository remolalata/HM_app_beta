import React from 'react';
import { TouchableOpacity, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import NewPostScreen from '../screens/NewPostScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';

import Colors from '../constants/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Test' />
        </Drawer.Navigator>       
    )
}

const MainDrawerNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: Colors.black,
                    inactiveTintColor: Colors.grey,
                    labelStyle: {
                        fontFamily: 'Lato-Regular',
                        fontSize: 12,
                        marginBottom: 15
                    },
                    style: {
                        height: 70,
                        backgroundColor: '#ffffff'
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

                        return <Icon name={iconName} size={25} color={color} style={{ marginTop: 10 }} />
                    },
                    tabBarButton: props => <TouchableOpacity {...props} style={
                        props.accessibilityState.selected
                            ? [props.style, { borderTopColor: Colors.black, borderTopWidth: 2 }]
                            : props.style
                    } />
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="NewPost" component={NewPostScreen} />
                <Tab.Screen name="Communities" component={CommunitiesScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default MainDrawerNavigator;

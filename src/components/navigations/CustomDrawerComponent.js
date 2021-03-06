import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

import DrawerSubTasks from '../DrawerSubTasks';
import DrawerMembers from '../DrawerMembers';

import Colors from '../../constants/colors';

import Plus from '../../assets/images/Plus.svg';

const CustomDrawerComponent = (props) => {
    const { 
        navigation,
        state: {
            routes
        }
    } = props;

    const groups = useSelector(state => state.groups.group2)

    return (
        <View style={styles.drawerContainer}>
            <View style={styles.drawerContent}>
                <View style={styles.groups}>
                    <DrawerContentScrollView
                        {...props}
                        keyboardShouldPersistTaps="handled">
                        <View style={{ marginTop: 16 }}>
                            <Text style={styles.groupsTitle}>Your Groups</Text>
                        </View>
                        {groups.map((item) => (
                            <DrawerItem
                                focused={item.id === 3 ? true : false}
                                activeBackgroundColor={Colors.black}
                                label={({ focused, color }) => {
                                    return (
                                        <>
                                            <View
                                                style={[
                                                    focused ? styles.activeGroup : null,
                                                    { width: 75, height: 60 },
                                                ]}>
                                                <Image source={item.image} style={styles.groupImage} />
                                            </View>
                                        </>
                                    );
                                }}
                                style={{ marginLeft: -2, marginRight: 0, marginVertical: -5 }}
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
                                <Icon name="more-vertical" color={Colors.grey} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <DrawerSubTasks navigation={navigation} activeRoute={routes[0].params} />
                    <DrawerMembers />
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
        flexGrow: 1,
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
        top: 6,
    },
    activeGroup: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 48,
        borderBottomLeftRadius: 48,
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
        marginTop: 15,
    },
    groupTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
        paddingLeft: 8,
    },
    groupTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
    },
    groupSubTitle: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black,
    },
});

export default CustomDrawerComponent;

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
        state: { routes },
    } = props;

    const groups = useSelector((state) => state.groups.group2);

    return (
        <View style={styles.drawerContainer}>
            <View style={styles.drawerContent}>
                <View style={styles.groups}>
                    <DrawerContentScrollView
                        {...props}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ width: 75 }}>
                        <View style={{ marginTop: 16, marginLeft: -3 }}>
                            <Text style={styles.groupsTitle}>Your Groups</Text>
                        </View>
                        {groups.map((item) => (
                            <View key={item.id.toString()}>
                                <DrawerItem
                                    focused={item.id === 3 ? true : false}
                                    activeBackgroundColor={null}
                                    inactiveBackgroundColor={null}
                                    label={({ focused, color }) => {
                                        return (
                                            <>
                                                <View style={{ width: 46.7 }}>
                                                    <Image
                                                        source={item.image}
                                                        style={styles.groupImage}
                                                    />
                                                </View>
                                            </>
                                        );
                                    }}
                                    onPress={() => navigation.navigate('Group')}
                                    style={{
                                        height: 58.7,
                                        marginLeft: 7,
                                        marginRight: 0,
                                        borderTopLeftRadius: 12,
                                        borderBottomLeftRadius: 12,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        backgroundColor: (item.id === 3) ? 'white' : null,
                                        marginBottom: 15
                                    }}
                                />
                            </View>
                        ))}
                        <View style={styles.addGroupContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('CreateCommunity')} style={styles.addGroup}>
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
                    <DrawerSubTasks
                        navigation={navigation}
                        activeRoute={routes[0].params}
                    />
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
        alignItems: 'center',
    },
    groupsTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 10,
        color: Colors.lightGrey,
        textAlign: 'center',
    },
    groupImage: {
        width: 46.67,
        height: 46.67,
        borderRadius: 10,
        position: 'relative',
        left: -2,
        bottom: 7
    },
    addGroupContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    addGroup: {
        width: 42,
        height: 42,
        borderRadius: 42 / 2,
        backgroundColor: '#4e4e4e',
        justifyContent: 'center',
        alignItems: 'center',
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

// import React, { useState } from "react";
// import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

// const NewPostScreen = props => {
//     const [modalVisible, setModalVisible] = useState(false);
//     return (
//         <View style={styles.centeredView}>
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     Alert.alert("Modal has been closed.");
//                     setModalVisible(!modalVisible);
//                 }}
//             >
//                 <View style={styles.centeredView}>
//                     <View style={styles.modalView}>
//                         <Text style={styles.modalText}>Hello World!</Text>
//                         <Pressable
//                             style={[styles.button, styles.buttonClose]}
//                             onPress={() => setModalVisible(!modalVisible)}
//                         >
//                             <Text style={styles.textStyle}>Hide Modal</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//             </Modal>
//             <Pressable
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={() => setModalVisible(true)}
//             >
//                 <Text style={styles.textStyle}>Show Modal</Text>
//             </Pressable>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: "white",
//         borderRadius: 20,
//         padding: 35,
//         alignItems: "center",
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2
//     },
//     buttonOpen: {
//         backgroundColor: "#F194FF",
//     },
//     buttonClose: {
//         backgroundColor: "#2196F3",
//     },
//     textStyle: {
//         color: "white",
//         fontWeight: "bold",
//         textAlign: "center"
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: "center"
//     }
// });

// export default NewPostScreen;

import { hideModalCreate, showModalCreate } from '@features/loading/actions';
import CreateYCTV from '@features/main/CreateYCTV';
import HomeScreen from '@features/main/Home';
import Manager from '@features/main/Manager';
import Notification from '@features/main/Notification';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import images from '@res/icons';
import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import ProductStack from './ProductStack';

const Tab = createBottomTabNavigator();

function MyTabBar({
    state,
    descriptors,
    navigation,
    showModalCreate,
    hideModalCreate,
    isShowModalCreate,
}) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                paddingBottom: Math.max(insets.bottom, 0),
            }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const getSourceImage = (isFocused) => {
                    switch (route.name) {
                        case 'home':
                            return isFocused ? images.tab_home1 : images.tab_home;
                        case 'loans':
                            return isFocused ? images.tab_searching1 : images.tab_searching;
                        case 'notification':
                            return isFocused ? images.notifications1 : images.notifications;
                        case 'manager':
                            return isFocused
                                ? images.tab_paper_folder1
                                : images.tab_paper_folder;
                        default:
                            return images.tab_add;
                    }
                };

                const onPress = () => {
                    if (route.name === 'create') {
                        if (isShowModalCreate) {
                            hideModalCreate();
                            return;
                        }
                        showModalCreate();
                        return;
                    }
                    hideModalCreate();
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
                    <Pressable
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 8,
                            backgroundColor: 'white',
                        }}>
                        <Image source={getSourceImage(isFocused)} />
                        {route.name != 'create' ? (
                            <Text
                                style={{
                                    color: isFocused ? colors.primary : colors.placeholder,
                                    fontSize: 10,
                                    marginTop: 4,
                                }}>
                                {label}
                            </Text>
                        ) : null}
                    </Pressable>
                );
            })}
        </View>
    );
}

const Tabbar = ({ showModalCreate, hideModalCreate, isShowModalCreate }) => {
    return (
        <Tab.Navigator
            tabBar={(props) => (
                <MyTabBar
                    isShowModalCreate={isShowModalCreate}
                    showModalCreate={showModalCreate}
                    {...props}
                    hideModalCreate={hideModalCreate}
                />
            )}>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    title: 'Trang chủ',
                }}
            />
            <Tab.Screen
                name="loans"
                component={ProductStack}
                options={{
                    title: 'Sản phẩm',
                }}
            />
            <Tab.Screen name="create" component={CreateYCTV} />
            <Tab.Screen
                name="notification"
                component={Notification}
                options={{
                    title: 'Thông báo',
                    tabBarBadge: '13',
                }}
            />
            <Tab.Screen
                name="manager"
                component={Manager}
                options={{
                    title: 'Quản lý',
                }}
            />
        </Tab.Navigator>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        isShowModalCreate: state.loading.isShowModalCreate,
    };
};

const mapDispatch = {
    showModalCreate: showModalCreate,
    hideModalCreate: hideModalCreate,
};

export default connect(mapStateToProps, mapDispatch)(Tabbar);

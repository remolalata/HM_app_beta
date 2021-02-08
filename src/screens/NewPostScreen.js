import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
    Modal,
    FlatList,
    Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Send from '../assets/images/Send.svg';
import ModalArrow from '../assets/images/Modal Arrow.svg';

import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

import { DUMMYGROUP2 } from '../data/dummy-data';

var { width } = Dimensions.get('window');

const NewPostScreen = (props) => {
    const { navigation } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [inputPost, setInputPost] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedImages, setSelectedImages] = useState(0);
    const [readyPost, setReadyPost] = useState(false);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedGroup(null);
                setSelectedImages(0);
                setInputPost('');
                setReadyPost(false);
            };
        }, []),
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => selectGroupHandler(item.id)}>
            <View style={styles.groupItem}>
                <Image source={item.image} style={styles.groupImage} />
                <Text style={styles.groupName}>{item.groupName}</Text>
            </View>
        </TouchableOpacity>
    );

    const onChangeTextHandler = (text) => {
        setInputPost(text);
        if (!/\S/.test(text)) {
            if (selectedImages > 0) {
                setReadyPost(true)
            } else {
                setReadyPost(false)
            }
        } else {
            setReadyPost(true);
        }
    };

    const selectGroupHandler = (id) => {
        if (id) {
            let activeGroup = DUMMYGROUP2.find((x) => id === x.id);
            setModalVisible(!modalVisible);
            setSelectedGroup(activeGroup);
        }
    };

    const selectImage = () => {
        ImagePicker.openPicker({
            multiple: true,
        })
            .then((images) => {
                setReadyPost(images.length > 0 ? true : false);
                setSelectedImages(images.length);
            })
            .catch(() => {
                setReadyPost(false);
                setSelectedImages(0);
            });
    };

    return (
        <>
            <Modal animationType="fade" visible={modalVisible} transparent={true}>
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <View style={styles.modalArrow}>
                                    <ModalArrow />
                                </View>

                                <View style={styles.selectGroupWrapper}>
                                    <Text style={styles.selectGroup}>Select Group</Text>
                                </View>

                                <FlatList
                                    data={DUMMYGROUP2}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View style={styles.screen}>
                <View style={styles.header}>
                    <View>
                        <View>
                            <Text style={styles.title}>New Post</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => setModalVisible(true)}>
                                {selectedGroup ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.selectGroupLabel}>
                                            You are posting in{' '}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.selectGroupLabel,
                                                { fontFamily: 'Lato-Bold' },
                                            ]}>
                                            {selectedGroup.groupName}
                                        </Text>
                                    </View>
                                ) : (
                                        <>
                                            <View>
                                                <Text style={styles.selectGroupLabel}>
                                                    Please select a group to post in
                      </Text>
                                            </View>
                                            <Icon name="chevron-down" size={12} color="#000000" />
                                        </>
                                    )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => navigation.goBack()}>
                        <Icon name="x" size={25} color={Colors.lightGrey} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexGrow: 1 }}>
                    <TextInput
                        placeholder="What’s going on? Write on!"
                        placeholderTextColor={Colors.grey}
                        style={styles.input}
                        multiline={true}
                        onChangeText={onChangeTextHandler}
                        value={inputPost}
                        editable={selectedGroup ? true : false}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            disabled={selectedGroup ? false : true}
                            onPress={() => selectImage()}>
                            <Icon
                                name="image"
                                size={25}
                                color={selectedGroup ? Colors.black : Colors.grey}
                            />
                        </TouchableOpacity>
                        {selectedImages > 0 && (
                            <View style={styles.labelCountWrapper}>
                                <Text style={styles.labelCount}>{selectedImages}</Text>
                            </View>
                        )}
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { backgroundColor: readyPost ? Colors.blue : Colors.grey },
                            ]}
                            disabled={selectedGroup && readyPost ? false : true}
                        >
                            <Text
                                style={{
                                    color: '#ffffff',
                                    fontFamily: 'Lato-Bold',
                                    fontSize: 14,
                                    marginRight: 8,
                                }}>
                                Post
                            </Text>
                            <Send width={14} height={15} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        height: 80,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        position: 'absolute',
        right: 25,
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
    },
    selectGroupLabel: {
        fontFamily: 'lato-Light',
        fontSize: 12,
        color: Colors.black,
    },
    footer: {
        flexDirection: 'row',
        width: width - 30,
        position: 'relative',
        left: 15,
        height: 66,
        borderTopColor: Colors.grey,
        borderTopWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontFamily: 'Lato-Regular',
        fontSize: 24,
        color: Colors.grey,
        paddingHorizontal: 15,
        color: Colors.black,
    },
    button: {
        flexDirection: 'row',
        width: 110,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
    modalArrow: {
        position: 'absolute',
        top: -9,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        height: 488,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        position: 'relative',
        top: 80,
        paddingHorizontal: 15,
    },
    selectGroupWrapper: {
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.5,
        paddingVertical: 25,
    },
    selectGroup: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
    },
    groupItem: {
        flexDirection: 'row',
        marginVertical: 15,
        marginHorizontal: 25,
        alignItems: 'center',
    },
    groupImage: {
        width: 46.67,
        height: 46.67,
        borderRadius: 46.67 / 2,
    },
    groupName: {
        fontFamily: 'Lato-Light',
        fontSize: 16,
        color: '#000000',
        marginLeft: 15,
    },
    labelCountWrapper: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        top: -2,
        right: -2,
    },
    labelCount: {
        fontFamily: 'Lato-Bold',
        fontSize: 8,
        color: '#ffffff',
    },
});

export default NewPostScreen;

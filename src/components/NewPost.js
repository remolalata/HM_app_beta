import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Dimensions,
    FlatList,
    Image,
    TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';

import Send from '../assets/images/Send Black.svg';
import ActiveSend from '../assets/images/Send Black.svg';

import Colors from '../constants/colors';

const windowHeight = Dimensions.get('window').height;

const NewPost = (props) => {
    const groups = useSelector((state) => state.groups.group2);

    const [communities, setCommunities] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [inputPost, setInputPost] = useState('');
    const [inputHeigt, setInputHeight] = useState(40);
    const [readyPost, setReadyPost] = useState(false);
    const [selectedImages, setSelectedImages] = useState(0);

    const animatedValue = useRef(new Animated.Value(375)).current;

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSelectedImages(0);
                setInputPost('');
                setReadyPost(false);
                setInputHeight(40)
            };
        }, []),
    );

    const startAnimation = () => {
        // if (!communities) {
        //     Animated.timing(animatedValue, {
        //         toValue: 0,
        //         useNativeDriver: true
        //     }).start();
        //     setCommunities(!communities);
        // } else {
        //     Animated.timing(animatedValue, {
        //         toValue: 375,
        //         useNativeDriver: true
        //     }).start();
        //     setCommunities(!communities);
        // }
        setCommunities(!communities);
    };

    const selectGroupHandler = (id) => {
        startAnimation();
        setSelectedGroup(id);
    };

    const onChangeTextHandler = text => {
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
    }

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
    }

    const renderItem = ({ item }) => (
        <>
            <TouchableOpacity onPress={() => selectGroupHandler(item.groupName)}>
                <View style={styles.group}>
                    <Image source={item.image} style={styles.groupImage} />
                    <Text style={styles.groupName}>{item.groupName}</Text>
                </View>
            </TouchableOpacity>
        </>
    );

    console.log(inputHeigt)

    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                bottom: 0,
                top: 0,
                left: 0,
                right: 0,
                justifyContent: 'flex-end',
            }}>
            {/* <Animated.View
                style={{
                    transform: [{ translateY: animatedValue }],
                }}
            >
                <TouchableWithoutFeedback onPress={startAnimation}>
                    <View style={styles.postContainer}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={styles.title}>You are Posting In</Text>
                        </View>
                        <View>
                            {selectedGroup ?
                                <Text style={styles.selectedGroup}>{selectedGroup}</Text> : <Text style={styles.select}>Select Community</Text>
                            }
                        </View>
                        <View style={styles.chevron}>
                            <Icon name={communities ? 'chevron-down' : 'chevron-up'} size={20} color="#000000" />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.communities} >
                    <FlatList
                        data={groups}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Animated.View> */}
            <TouchableWithoutFeedback onPress={startAnimation}>
                <View style={styles.postContainer}>
                    <View style={{ marginRight: 10 }}>
                        <Text style={styles.title}>You are Posting In</Text>
                    </View>
                    <View>
                        {selectedGroup ? (
                            <Text style={styles.selectedGroup}>{selectedGroup}</Text>
                        ) : (
                                <Text style={styles.select}>Select Community</Text>
                            )}
                    </View>
                    <View style={styles.chevron}>
                        <Icon
                            name={communities ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color="#000000"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {communities && (
                <View style={styles.communities}>
                    <FlatList
                        data={groups}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            )}
            {selectedGroup &&
                <View style={styles.formGroup}>
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity onPress={selectImage}>
                            <Icon name="image" size={25} color={Colors.black} />
                        </TouchableOpacity>
                        {selectedImages > 0 && <View style={styles.labelCountWrapper}>
                            <Text style={styles.labelCount}>{selectedImages}</Text>
                        </View>}
                    </View>
                    <View style={[styles.inputGroup, { height: Math.max(40, inputHeigt) }]}>
                        <View style={{ flexGrow: 1, width: 50 }}>
                            <TextInput
                                placeholder="Type here"
                                numberOfLines={5}
                                multiline={true}
                                placeholderTextColor="rgba(51, 51, 51, 0.4)"
                                style={styles.input}
                                onChangeText={onChangeTextHandler}
                                onContentSizeChange={e => {
                                    if (e.nativeEvent.contentSize.height <= 121) {
                                        setInputHeight(e.nativeEvent.contentSize.height)
                                    }
                                }}
                                value={inputPost}
                            />
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Send width={18} height={20} style={{ opacity: readyPost ? 1 : 0.4 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 38,
        backgroundColor: '#ffffff',
        position: 'relative',
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.blue,
    },
    select: {
        fontSize: 14,
        opacity: 0.5,
    },
    selectedGroup: {
        fontFamily: 'Lato-Bold',
        color: Colors.black,
        fontSize: 14,
    },
    chevron: {
        position: 'absolute',
        right: 15,
    },
    communities: {
        backgroundColor: '#fff',
        height: 375,
        borderTopWidth: 0.5,
        borderColor: Colors.grey,
        paddingVertical: 11,
    },
    group: {
        flexDirection: 'row',
        marginVertical: 11,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    groupImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    groupName: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000000',
    },
    formGroup: {
        borderTopWidth: 0.5,
        borderColor: Colors.grey,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 18,
        paddingRight: 8
    },
    inputGroup: {
        flexGrow: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 5,
        marginLeft: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontFamily: 'Lato-Regular',
        color: Colors.black,
        fontSize: 12,
        width: '95%',
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
    }
});

export default NewPost;

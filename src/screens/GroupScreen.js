import React, { useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import { useFocusEffect } from '@react-navigation/native';

import ThumbsUp from '../assets/images/Thumbs Up.svg';
import ThumbsUpActive from '../assets/images/Thumbs Up Fill.svg';
import Send from '../assets/images/Send.svg';
import ActiveSend from '../assets/images/Send Black.svg';

import GroupHeader from '../components/GroupHeader';

import Colors from '../constants/colors';

import { DUMMYGROUPPOST } from '../data/dummy-data';

const GroupScreen = (props) => {
    const { navigation } = props;

    const [selectedImages, setSelectedImages] = useState(0);
    const [inputPost, setInputPost] = useState('');
    const [readyPost, setReadyPost] = useState(false);
    const [inputHeigt, setInputHeight] = useState(40);

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

    const goToProfileHandler = () => {
        navigation.navigate('Profile');
    };

    const toggleDrawer = () => {
        navigation.toggleDrawer();
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

    const renderItem = ({ item }) => (
        <View style={styles.post}>
            <View style={[styles.header, styles.paddingHorizontal]}>
                <View style={{ marginRight: 10 }}>
                    <Image source={item.userAvatar} style={styles.userAvatar} />
                </View>
                <View>
                    <View>
                        <Text style={styles.author}>{item.author}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.authorInfo}>@{item.userName}</Text>
                        </View>
                        <View>
                            <Text style={styles.bulletSeparator}>&bull;</Text>
                        </View>
                        <View>
                            <Text style={[styles.authorInfo, styles.authorStatus]}>
                                {item.userStatus}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.bulletSeparator}>&bull;</Text>
                        </View>
                        <View>
                            <Text style={styles.authorInfo}>{item.createdAt}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.body, styles.paddingHorizontal]}>
                <Text style={styles.content} numberOfLines={3}>
                    {item.content}
                </Text>
            </View>
            {item.image && <Image source={item.image} style={styles.image} />}
            <View style={[styles.likesComments, styles.paddingHorizontal]}>
                <View>
                    <Text style={styles.likeComment}>{item.likes} Likes</Text>
                </View>
                <View>
                    <Text style={styles.bulletSeparator}>&bull;</Text>
                </View>
                <View>
                    <Text style={styles.likeComment}>{item.comments} Comments</Text>
                </View>
            </View>
            <View style={styles.likeCommentBtns}>
                <TouchableOpacity style={styles.likeCommentBtn}>
                    {item.id === 1 ? (
                        <ThumbsUp width={32} height={32} />
                    ) : (
                            <ThumbsUpActive width={32} height={32} />
                        )}
                </TouchableOpacity>
                <View style={styles.likeCommentBtnsSeparator}></View>
                <TouchableOpacity style={styles.likeCommentBtn}>
                    <Icon name="message-circle" size={30} color={Colors.grey} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.screen}>
            <GroupHeader goToProfileHandler={goToProfileHandler} toggleDrawer={toggleDrawer} />
            <FlatList
                data={DUMMYGROUPPOST}
                renderItem={renderItem}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 8, backgroundColor: Colors.lightGrey }} />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginBottom: 55 }}
            />
            <View style={[styles.footer, { height: Math.max(40, inputHeigt) + 26 }]}>
                <View style={{ marginRight: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Icon name="home" size={25} color={Colors.grey} />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity onPress={selectImage}>
                        <Icon name="image" size={25} color={Colors.grey} />
                    </TouchableOpacity>
                    {selectedImages > 0 && <View style={styles.labelCountWrapper}>
                        <Text style={styles.labelCount}>{selectedImages}</Text>
                    </View>}
                </View>
                <View style={[styles.textInputWrapper, { height: Math.max(40, inputHeigt) }]}>
                    <View style={{ width: '90%' }}>
                        <TextInput
                            placeholder="Post something in Dimagiba Family!"
                            multiline={true}
                            numberOfLines={3}
                            placeholderTextColor={Colors.black}
                            onChangeText={onChangeTextHandler}
                            style={[styles.textInput, { fontFamily: /\S/.test(inputPost) ? 'Lato-Regular' : 'Lato-Light' }]}
                            onContentSizeChange={e => {
                                if (e.nativeEvent.contentSize.height <= 71) {
                                    setInputHeight(e.nativeEvent.contentSize.height)
                                }
                            }}
                            value={inputPost}
                        />
                    </View>
                    <View style={{ width: '10%' }}>
                        <TouchableOpacity disabled={readyPost ? false : true} >
                            <ActiveSend width={26} height={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e5e5e5',
    },
    paddingHorizontal: {
        paddingHorizontal: 15,
    },
    post: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
    },
    author: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
    },
    authorInfo: {
        fontFamily: 'Lat-Regular',
        fontSize: 12,
        color: Colors.black,
    },
    authorStatus: {
        fontFamily: 'Lato-Bold',
        color: Colors.green,
    },
    body: {
        marginTop: 15,
        marginBottom: 10,
    },
    content: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black,
    },
    image: {
        width: '100%',
        height: 300,
    },
    likesComments: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    likeComment: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black,
    },
    bulletSeparator: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 5,
    },
    likeCommentBtns: {
        flexDirection: 'row',
        position: 'relative',
    },
    likeCommentBtnsSeparator: {
        position: 'absolute',
        width: 1,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.lightGrey,
        left: '49%',
    },
    likeCommentBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    textInputWrapper: {
        flex: 1,
        marginLeft: 15,
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    textInput: {
        fontSize: 14
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

export default GroupScreen;

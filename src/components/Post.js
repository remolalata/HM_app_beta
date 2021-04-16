import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import ThumbsUp from '../assets/images/Thumbs Up.svg';
import ThumbsUpActive from '../assets/images/Thumbs Up Fill.svg';

import Colors from '../constants/colors';

var { width } = Dimensions.get('window');

const Post = (props) => {

    const { item, onPress, goToLoginHandler } = props;

    const user = useSelector(state => state.user.user);

    const likeHandler = action => {
        if (user) {
            console.log('Like!');
        } else {
            goToLoginHandler();
        }
    }

    const commentHandler = action => {
        if (user) {
            console.log('Like!');
        } else {
            goToLoginHandler();
        }
    }

    return (
        <View style={styles.post}>
            <View style={[styles.header, styles.paddingHorizontal]}>
                <View style={styles.mainHeader}>
                    <View>
                        <TouchableOpacity onPress={onPress}>
                            <Text style={styles.groupName}>{item.groupName}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Icon name="more-horizontal" size={25} color={Colors.lightGrey} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subHeader}>
                    <View>
                        <Text style={styles.subHeaderText}>{item.groupType}</Text>
                    </View>
                    <View>
                        <Text style={styles.bulletSeparator}>&bull;</Text>
                    </View>
                    <View>
                        <Text style={styles.subHeaderText}>@{item.author}</Text>
                    </View>
                    <View>
                        <Text style={styles.bulletSeparator}>&bull;</Text>
                    </View>
                    <View>
                        <Text style={styles.subHeaderText}>{item.createdAt}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.body, styles.paddingHorizontal]}>
                <Text style={styles.content} numberOfLines={3}>
                    {item.content}
                </Text>
            </View>
            {item.image &&
                <Image source={item.image} style={styles.image} />
            }
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
                <TouchableOpacity style={styles.likeCommentBtn} onPress={likeHandler}>
                    <ThumbsUp width={32} height={32} />
                </TouchableOpacity>
                <View style={styles.likeCommentBtnsSeparator}></View>
                <TouchableOpacity style={styles.likeCommentBtn} onPress={commentHandler}>
                    <Icon name='message-circle' size={30} color={Colors.grey} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    paddingHorizontal: {
        paddingHorizontal: 15
    },
    post: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        // borderBottomWidth: 8,
        // borderBottomColor: Colors.lightGrey
    },
    mainHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    groupName: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
    },
    subHeader: {
        position: 'relative',
        top: -5,
        flexDirection: 'row'
    },
    subHeaderText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black,
    },
    body: {
        marginTop: 15,
        marginBottom: 10
    },
    content: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black,
    },
    image: {
        width: '100%',
        height: 300
    },
    likesComments: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    likeComment: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    bulletSeparator: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black,
        paddingHorizontal: 5
    },
    likeCommentBtns: {
        flexDirection: 'row',
        position: 'relative'
    },
    likeCommentBtnsSeparator: {
        position: 'absolute',
        width: 1,
        top: 0,
        bottom: 0,
        backgroundColor: Colors.lightGrey,
        left: '49%'
    },
    likeCommentBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Post;

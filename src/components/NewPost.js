import React, { useState, useRef, useReducer } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

const windowHeight = Dimensions.get('window').height;

const NewPost = props => {

    const groups = useSelector(state => state.groups.group2);

    const [communities, setCommunities] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const animatedValue = useRef(new Animated.Value(375)).current;

    const startAnimation = () => {
        if (!communities) {
            Animated.timing(animatedValue, {
                toValue: 0,
                useNativeDriver: true
            }).start();
            setCommunities(!communities);
        } else {
            Animated.timing(animatedValue, {
                toValue: 375,
                useNativeDriver: true
            }).start();
            setCommunities(!communities);
        }
    }

    const selectGroupHandler = id => {
        startAnimation();
        setSelectedGroup(id);
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
    )

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

            <Animated.View
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
            </Animated.View>
        </View >
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
        fontSize: 14
    },
    chevron: {
        position: 'absolute',
        right: 15
    },
    communities: {
        backgroundColor: '#fff',
        height: 375,
        borderTopWidth: 0.5,
        borderColor: Colors.grey,
        paddingVertical: 11
    },
    group: {
        flexDirection: 'row',
        marginVertical: 11,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    groupImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15
    },
    groupName: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000000'
    }
});

export default NewPost;

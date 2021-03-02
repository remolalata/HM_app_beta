import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

let { width } = Dimensions.get('window');

let imageWrapperWidth = width * 0.2;
let groupContentWrapperWidth = width * 0.7;

const GroupDiscover = props => {
    const { group, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.group}>
                <View style={styles.imageWrapper}>
                    <Image source={group.image} style={styles.image} />
                </View>
                <View style={{ width: groupContentWrapperWidth }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text style={styles.groupName}>{group.groupName}</Text>
                        </View>
                        <View>
                            <TouchableOpacity>
                                <Icon name="more-horizontal" size={25} color={Colors.lightGrey} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            top: -5,
                        }}>
                        <View>
                            <Text style={styles.regularText}>{group.groupType}</Text>
                        </View>
                        <View style={{ marginLeft: 5, marginRight: 5 }}>
                            <Text style={{ color: Colors.black }}>&bull;</Text>
                        </View>
                        <View>
                            <Text style={styles.regularText}>@{group.groupUsername}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={styles.regularText}>{group.groupDescription}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ffffff'
    },
    imageWrapper: {
        width: imageWrapperWidth,
        height: imageWrapperWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: imageWrapperWidth * 0.8,
        height: imageWrapperWidth * 0.8,
        borderRadius: (imageWrapperWidth * 0.8) / 2,
    },
    groupName: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
    },
    regularText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black,
    },
});

export default GroupDiscover;

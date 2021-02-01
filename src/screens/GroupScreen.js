import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native';

import GroupHeader from '../components/GroupHeader';
import Post from '../components/Post';

import Colors from '../constants/colors'

import { DUMMYPOST } from '../data/dummy-data';;

const GroupScreen = props => {

    const { navigation } = props;

    const goToProfileHandler = () => {
        navigation.navigate('Profile');
    }

    return (
        <SafeAreaView style={styles.screen}>
            <GroupHeader goToProfileHandler={goToProfileHandler} />
            <FlatList
                data={DUMMYPOST}
                renderItem={(item) => <Post item={item.item} />}
                ItemSeparatorComponent={() => <View style={{ height: 8, backgroundColor: Colors.lightGrey }} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default GroupScreen;

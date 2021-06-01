import React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import Colors from '../constants/colors';

import Button from '../components/Button';

const InviteMembers = props => {
    const { navigation } = props;
    
    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Invite Members</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text
                    style={{
                        fontFamily: 'Lato-Regular',
                        fontSize: 14,
                        width: 240,
                        textAlign: 'center'
                    }}
                >Having the first few members of your community can go a long way!</Text>
            </View>
            <Button
                title={'Done'}
                style={[styles.button, { backgroundColor: Colors.blue }]}
                color={'#ffffff'}
                onPress={() => navigation.navigate('SetupGroup')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 25,
        alignItems: 'center'
    },
    header: {
        height: 57,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    },
    button: {
        width: 110,
        height: 40,
        position: 'absolute',
        bottom: 25
    }
});

export default InviteMembers;
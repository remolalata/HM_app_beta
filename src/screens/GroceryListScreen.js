import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

const LocatorScreen = props => {
    const { navigation } = props;

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.chevron}>
                        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                            <Icon name='chevron-left' size={30} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={styles.title}>Grocery List</Text>
                    </View>
                </View>
                <View style={styles.intro}>
                    <View style={{ height: 80, justifyContent: 'space-between'}}>
                        <Text style={styles.text}>The <Text style={[styles.text, { fontFamily: 'Lato-Bold' }]}>Grocery List</Text> feature is still being worked on by our team, we will let you know once this feature is up and running.</Text>
                        <Text style={styles.text}>Thank you for checking this feature out.</Text>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.team}>-Team HappyMoppet</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        padding: 15
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    header: {
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.grey,
        position: 'relative'
    },
    chevron: {
        position: 'absolute',
        left: -15,
        zIndex: 10,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    },
    intro: {
        width: 300,
        marginTop: 123,
    },
    text: {
        fontFamily: 'Lato-Regular',
        color: Colors.black,
        fontSize: 12
    },
    team: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: Colors.black,
        textAlign: 'right'
    }
})

export default LocatorScreen;
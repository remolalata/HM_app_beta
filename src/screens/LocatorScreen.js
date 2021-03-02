import React, { useState } from 'react';
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

    const [activeRadio, setActiveRadio] = useState(0);

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
                        <Text style={styles.title}>Locator</Text>
                    </View>
                </View>
                <View style={{ paddingVertical: 25, paddingHorizontal: 40 }}>
                    <Text style={styles.intro}>Setting your Locator is the fastest way to inform your family where you are, the Locator that you set here will only be visible to members of the Dimagiba Family Family.</Text>
                </View>
                <View style={styles.locations}>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(0)}>
                        <View style={styles.radio}>
                            {activeRadio === 0 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>At Home</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(1)}>
                        <View style={styles.radio}>
                            {activeRadio === 1 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>Homebound</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(2)}>
                        <View style={styles.radio}>
                            {activeRadio === 2 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>At Office</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(3)}>
                        <View style={styles.radio}>
                            {activeRadio === 3 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>At School</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(4)}>
                        <View style={styles.radio}>
                            {activeRadio === 4 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>In a meeting</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.location} onPress={() => setActiveRadio(5)}>
                        <View style={styles.radio}>
                            {activeRadio === 5 ? <View style={styles.selected}></View> : null}
                        </View>
                        <View>
                            <Text>None</Text>
                        </View>
                    </TouchableOpacity>
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
        flex: 1
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
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black
    },
    locations: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.grey,
        marginHorizontal: 25,
        paddingVertical: 15
    },
    location: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    radio: {
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderWidth: 1,
        borderColor: Colors.grey,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected: {
        width: 9,
        height: 9,
        borderRadius: 9 / 2,
        backgroundColor: Colors.green
    }
})

export default LocatorScreen;
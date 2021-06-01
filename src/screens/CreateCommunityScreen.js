import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Colors from '../constants/colors';

import Button from '../components/Button';

const CreateCommunity = props => {
    const { navigation } = props;

    const [groupName, setGroupName] = useState('');
    const [selectedPrivacy, setSelectedPrivacy] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [form, setForm] = useState(false);
    const [privacyPlaceholder, setPrivacyPlaceholder] = useState('Choose Privacy');

    const inputHandler = e => {
        setGroupName(e);
    }

    return (
        <>
            {overlay &&
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: 2
                    }}
                ></View>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setOverlay(!overlay);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.nudge}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setOverlay(!overlay);
                            }}
                        ></TouchableOpacity>

                        <TouchableOpacity
                            style={styles.privacyOption}
                            onPress={() => {
                                setSelectedPrivacy('private');
                                setModalVisible(!modalVisible);
                                setOverlay(!overlay);
                                setPrivacyPlaceholder('Private Community');
                            }}
                        >
                            <Text style={styles.privacyOptionMainText}>Private Community</Text>
                            <Text style={styles.privacyOptionSubText}>Community will only be accessible through invites</Text>
                        </TouchableOpacity>

                        <View style={{
                            width: 266,
                            height: 1,
                            backgroundColor: Colors.lightGrey,
                            marginVertical: 15
                        }}></View>

                        <TouchableOpacity
                            style={[styles.privacyOption, { marginBottom: 25 }]}
                            onPress={() => {
                                setSelectedPrivacy('public');
                                setModalVisible(!modalVisible);
                                setOverlay(!overlay);
                                setPrivacyPlaceholder('Public Community');
                            }}
                        >
                            <Text style={styles.privacyOptionMainText}>Public Community</Text>
                            <Text style={styles.privacyOptionSubText}>Community will br accessible for everyone</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create Community</Text>
                    <View style={styles.closeWrapper}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                height: 35,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Icon name="x" size={25} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder={'Enter Group Name'}
                            placeholderTextColor={Colors.grey}
                            style={styles.input}
                            onChangeText={text => inputHandler(text)}
                            value={groupName}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity
                            style={styles.privacy}
                            onPress={() => {
                                setOverlay(true);
                                setModalVisible(true);
                            }}
                        >
                            <View style={styles.privacyView}>
                                <Text style={styles.privacyText}>{privacyPlaceholder}</Text>
                                <Icon name='chevron-down' size={25} color={Colors.black} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonWrapper}>
                        {selectedPrivacy !== '' && groupName !== '' ?
                            <Button
                                title={'Create'}
                                style={[styles.button, { backgroundColor: Colors.blue }]}
                                color={'#ffffff'}
                                onPress={() => navigation.navigate('InviteMembers')}
                            />
                            :
                            <Button
                                title={'Create'}
                                style={[styles.button, { backgroundColor: Colors.grey }]}
                                color={'#ffffff'}
                            />
                        }
                    </View>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 25
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
    closeWrapper: {
        position: 'absolute',
        right: 0
    },
    content: {
        alignItems: 'center',
        marginTop: '50%',
    },
    inputWrapper: {
        width: 300,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 15,
        backgroundColor: Colors.lightGrey
    },
    input: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: Colors.black,
    },
    buttonWrapper: {
        marginTop: 35
    },
    button: {
        width: 110,
        height: 40,
        backgroundColor: Colors.grey
    },
    privacy: {
        height: 40,
        justifyContent: 'center'
    },
    privacyView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    privacyText: {
        color: Colors.black,
        fontFamily: 'Lato-Regular',
        fontSize: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    nudge: {
        backgroundColor: Colors.lightGrey,
        width: 40,
        height: 8,
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 30
    },
    privacyOptionMainText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000000',
        textAlign: 'center'
    },
    privacyOptionSubText: {
        fontFamily: 'Lato-Regular',
        fontSize: 12
    }
});

export default CreateCommunity;
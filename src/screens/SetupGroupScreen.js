import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../constants/colors';

import Button from '../components/Button';

const SetupGroup = props => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' }
    ]);
    const [selectCoverImage, setSelectedCoverImage] = useState(0);
    const [previewCoverImageMime, setPreviewCoverImageMime] = useState(null);
    const [previewCoverImageData, setPreviewCoverImageData] = useState(null);
    let previewCoverImage = null;

    const selectImage = () => {
        ImagePicker.openPicker({
            multiple: false,
            includeBase64: true
        })
            .then((images) => {
                console.log(images);
                setPreviewCoverImageMime(images.mime);
                setPreviewCoverImageData(images.data);
            })
            .catch(err => {
                console.log(err)
            });
    }

    if (previewCoverImageData !== null && previewCoverImageMime !== null) {
        previewCoverImage = <TouchableOpacity onPress={selectImage}>
            <Image source={{ uri: `data:${previewCoverImageMime};base64,${previewCoverImageData}` }} style={styles.previewCoverImage} />
        </TouchableOpacity>;
    }

    const FirstScene = () => {
        return (
            <View style={styles.scene}>
                <View style={styles.headings}>
                    <Text style={styles.mainHeading}>Add Cover Photo</Text>
                    <Text style={styles.subHeading} numberOfLines={2}>Here’s to give a visual idea to people what the community is all about.</Text>
                </View>
                {previewCoverImage !== null ?
                    previewCoverImage
                    :
                    <TouchableOpacity style={styles.content} onPress={selectImage}>
                        <Icon name='image' size={24} color={Colors.grey} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    const SecondScene = () => {
        return (
            <View>
                <Text>Add Description</Text>
            </View>
        )
    }

    const ThirdScene = () => {
        return (
            <View>
                <Text>Create Post</Text>
            </View>
        )
    }

    const renderScene = SceneMap({
        first: FirstScene,
        second: SecondScene,
        third: ThirdScene
    })

    return (
        <View style={styles.screen}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={() => null}
                swipeEnabled={false}
            />
            <View style={styles.bottomBar}>
                <View style={styles.progressBar}>
                    <View style={[styles.bar, { backgroundColor: (index >= 0) ? Colors.blue : Colors.lightGrey }]}></View>
                    <View style={[styles.bar, { backgroundColor: (index >= 1) ? Colors.blue : Colors.lightGrey }]}></View>
                    <View style={[styles.bar, { backgroundColor: (index >= 2) ? Colors.blue : Colors.lightGrey }]}></View>
                </View>
                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        onPress={() => {
                            if (index === 0) {
                                setIndex(1);
                            } else if (index === 1) {
                                setIndex(2)
                            }
                        }}
                    >
                        <Text style={styles.continueLater}>Continue Later</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Button
                            title={'Next'}
                            style={[styles.button, { backgroundColor: Colors.grey }]}
                            color={'#ffffff'}
                            onPress={() => navigation.navigate('SetupGroup')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 25
    },
    mainHeading: {
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        marginVertical: 10,
        color: Colors.black
    },
    subHeading: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black,
        textAlign: 'center'
    },
    content: {
        height: 150,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    },
    previewCoverImage: {
        resizeMode: 'cover',
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginTop: 25
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bar: {
        width: '32%',
        height: 5,
        borderRadius: 5,
        backgroundColor: Colors.lightGrey
    },
    bottomButtons: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    continueLater: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: Colors.black
    },
    button: {
        width: 110,
        height: 40
    }
});

export default SetupGroup;
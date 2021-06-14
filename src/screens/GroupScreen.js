import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Animated,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabView, TabBar } from 'react-native-tab-view';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';

// CONSTANTS
import Colors from '../constants/colors';

// COMPONENTS
import SearchBar from '../components/SearchBar';
import Filters from '../components/Marketplace/Filters';

// COMPONENTS
import GroupDiscover from '../components/GroupDiscover';
import ShoppingCart from '../components/Marketplace/ShoppingCart';

import ThumbsUp from '../assets/images/Thumbs Up.svg';
import ThumbsUpActive from '../assets/images/Thumbs Up Fill.svg';
import ActiveSend from '../assets/images/Send Black.svg';
import Filter from '../components/Marketplace/Filter';
import Item from '../components/Marketplace/Item';

import { selectedProduct, getData, getGroupProduct } from '../store/actions/products';
import { displayAds } from '../store/actions/utils';

const TabBarHeight = 48;
const HeaderHeight = 92;

const dummyPosts = [
    {
        id: 1,
        groupId: 1,
        author: 'De Vitto',
        userName: 'deVittoEpektus',
        userAvatar: require('../assets/images/bakal_bikes/posts/avatar_1.png'),
        userStatus: 'Homebound',
        createdAt: '30s ago',
        content: 'Me Lumapag🚴‍♂️🔥🍻🤘🏼 #BrunoRoad20 - Para sa Ekonomiya👌🏼 magBisikleta🚴‍♂️🚴‍♀️🤘🏼Solusyon sa Polusyon',
        image: require('../assets/images/bakal_bikes/posts/post_img_1.png'),
        likes: 7,
        comments: 8
    },
    {
        id: 2,
        groupId: 1,
        author: 'Louis Roth',
        userName: 'rothstar',
        userAvatar: require('../assets/images/bakal_bikes/posts/avatar_2.png'),
        userStatus: 'Away',
        createdAt: '2m ago',
        content: 'I felt that a good ride on my old bike was overdue so I pulled it out, fit some new Panaracer tires and went out for a spin. 1971 Stella SX6...',
        image: require('../assets/images/bakal_bikes/posts/post_img_2.png'),
        likes: 148,
        comments: 83
    },
    {
        id: 3,
        groupId: 1,
        author: 'Joseph Palmersheim',
        userName: 'jopalm',
        userAvatar: require('../assets/images/bakal_bikes/posts/avatar_3.png'),
        userStatus: 'Offline',
        createdAt: 'May 25, 2:30am',
        content: 'Any fellow Raleigh nerds out there to help me with this? I bought a chrome Raleigh Sports today, and am trying to age it based on the bottom bracket serial number of "1872973." Interestingly, most of the components on the bike seem to have been replaced over time: Schwinn brakes, Messinger seat, Shimano shifters, Araya wheels and a mystery 3-speed (garbage) hub. I have the parts to restore it, but its gonna take a while, lol.',
        image: null,
        likes: 204,
        comments: 67
    },
    {
        id: 4,
        groupId: 1,
        author: 'Herve Eibes',
        userName: 'theHerve',
        userAvatar: require('../assets/images/bakal_bikes/posts/avatar_4.png'),
        userStatus: 'Offline',
        createdAt: 'May 25, 12:01am',
        content: 'Sunday ride in family.',
        image: require('../assets/images/bakal_bikes/posts/post_img_4.png'),
        likes: 111,
        comments: 34
    },
    {
        id: 5,
        groupId: 1,
        author: 'John Walis',
        userName: 'broombroom',
        userAvatar: require('../assets/images/bakal_bikes/posts/avatar_5.png'),
        userStatus: 'Offline',
        createdAt: 'May 18, 7:55am',
        content: 'What tubes fit in a 26 3/8 bike tire? Those tubes are not available where I live ',
        image: null,
        likes: 24,
        comments: 81
    }
]

const TabScene = ({
    scene,
    numCols,
    data,
    renderItem,
    onGetRef,
    scrollY,
    onScrollEndDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
    onPress,
    tabIndex
}) => {
    const windowHeight = Dimensions.get('window').height;

    let separatorHeight = (scene === 'feed') ? 8 : 0;

    return (
        <Animated.FlatList
            scrollToOverflowEnabled={true}
            numColumns={numCols}
            ref={onGetRef}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                useNativeDriver: true,
            })}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onScrollEndDrag={onScrollEndDrag}
            onMomentumScrollEnd={onMomentumScrollEnd}
            ItemSeparatorComponent={() => <View style={{ height: separatorHeight, backgroundColor: Colors.lightGrey }} />}
            contentContainerStyle={{
                paddingTop: (tabIndex === 1) ? HeaderHeight + TabBarHeight + 46 : HeaderHeight + TabBarHeight,
                minHeight: windowHeight - TabBarHeight,
                backgroundColor: '#e5e5e5',
            }}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: (scene === 'feed') ? 0 : -5 }}
        />
    );
};

const GroupScreen = props => {

    const { navigation, route } = props;

    const [selectedImages, setSelectedImages] = useState(0);
    const [inputPost, setInputPost] = useState('');
    const [readyPost, setReadyPost] = useState(false);
    const [inputHeigt, setInputHeight] = useState(40);

    const posts = useSelector(state => state.posts.groupPosts)
    const groups = useSelector(state => state.groups.groups);
    const modals = useSelector(state => state.modals.newPost);
    const user = useSelector(state => state.user.user);
    const productsList = useSelector((state) => state.products.groupProducts);
    const marketplaceFilters = useSelector(state => state.utils.marketplaceFilters);

    let filteredProducts = productsList;

    if (marketplaceFilters.price === 'LTH') {
        filteredProducts = productsList.sort((a, b) => a.raw_price - b.raw_price);
    } else {
        filteredProducts = productsList.sort((a, b) => b.raw_price - a.raw_price);
    }

    const dispatch = useDispatch();

    const [tabIndex, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'feed', title: 'Feed' },
        { key: 'marketplace', title: 'Marketplace' },
    ]);

    const scrollY = useRef(new Animated.Value(0)).current;
    let listRefArr = useRef([]);
    let listOffset = useRef({});
    let isListGliding = useRef(false);

    useEffect(() => {
        firestore()
            .collection('products')
            .get()
            .then(querySnapshot => {
                let data = [];
                if (querySnapshot.size) {
                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().group === '2') {
                            let assembledSnapshot = documentSnapshot.data();
                            assembledSnapshot.id = documentSnapshot.id;
                            data.push(assembledSnapshot);
                        }
                    })
                }

                dispatch(getGroupProduct(data));
            });

        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });

        return () => {
            scrollY.removeAllListeners();
        };

    }, [routes, tabIndex, route]);

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
        navigation.navigate('Profile')
    }

    const goToLoginHandler = () => {
        navigation.navigate('Login')
    }

    const goBack = () => {
        navigation.goBack();
    }

    const goToProductScreenHandler = id => {
        dispatch(selectedProduct(id));
        dispatch(displayAds(true));
        navigation.navigate('Product');
    }

    const syncScrollOffset = () => {
        const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach((item) => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
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

    const renderHeader = () => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [0, -HeaderHeight],
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View style={[styles.header, { transform: [{ translateY: y }] }]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View>
                            <TouchableWithoutFeedback onPress={toggleDrawer}>
                                <Icon name="menu" size={30} color='#000000' />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flexGrow: 1, marginHorizontal: 15 }}>
                            <SearchBar />
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={goToProfileHandler}>
                                <Image style={styles.headerAvatar} source={require('../assets/images/avatar.png')} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Bakal Bikes</Text>
                    </View>
                </View>
            </Animated.View>
        );
    };

    const renderFeed = ({ item, index }) => {
        return (
            <View style={styles.post}>
                <StatusBar
                    backgroundColor='#ffffff'
                    barStyle='dark-content'
                />
                <View style={[styles.postHeader, styles.paddingHorizontal]}>
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
                        {item.id === 1 || item.id === 3 || item.id === 4 ? (
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
        )
    }

    const renderMarketPlace = ({ item, index }) => {
        const {
            title,
            price,
            description,
            address,
            ratings,
            id
        } = item;

        return (
            <View style={{ backgroundColor: '#ffffff' }}>
                <Item
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    address={address}
                    ratings={ratings}
                    goToProduct={goToProductScreenHandler}
                />
            </View>
        )
    }

    const renderLabel = ({ route, focused }) => {
        return (
            <Text
                style={[
                    styles.label,
                    {
                        fontFamily: focused ? 'Lato-Bold' : 'Lato-Regular',
                        width: 100,
                        textAlign: 'center'
                    }
                ]}
            >
                {route.title}
            </Text>
        );
    };

    const renderScene = ({ route }) => {
        const focused = route.key === routes[tabIndex].key;
        let numCols;
        let data;
        let renderItem;
        let scene;

        switch (route.key) {
            case 'feed':
                scene = 'feed';
                numCols = 1;
                data = dummyPosts;
                renderItem = renderFeed;
                break;
            case 'marketplace':
                scene = 'marketplace';
                numCols = 1;
                data = filteredProducts;
                renderItem = renderMarketPlace;
                break;
            default:
                return null;
        }

        return (
            <TabScene
                numCols={numCols}
                data={data}
                renderItem={renderItem}
                scrollY={scrollY}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                onGetRef={(ref) => {
                    if (ref) {
                        const found = listRefArr.current.find((e) => e.key === route.key);
                        if (!found) {
                            listRefArr.current.push({
                                key: route.key,
                                value: ref,
                            });
                        }
                    }
                }}
                onPress={onPress}
                scene={scene}
                tabIndex={tabIndex}
            />
        );
    };

    const renderTabBar = (props) => {

        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [HeaderHeight, 0],
            extrapolateRight: 'clamp',
        });

        const radius = scrollY.interpolate({
            inputRange: [0, 10],
            outputRange: [0, 10],
            extrapolateRight: 'clamp',
        });

        return (
            <>
                <Animated.View
                    style={{
                        top: 0,
                        zIndex: 1,
                        position: 'absolute',
                        transform: [{ translateY: y }],
                        borderTopLeftRadius: radius,
                        borderTopRightRadius: radius,
                        overflow: 'hidden',
                        width: '100%'
                    }}>
                    <TabBar
                        {...props}
                        onTabPress={({ route, preventDefault }) => {
                            if (isListGliding.current) {
                                preventDefault();
                            }
                        }}
                        style={styles.tab}
                        renderLabel={renderLabel}
                        indicatorStyle={styles.indicator}
                    />
                    {tabIndex === 1 &&
                        <View style={{ overflow: 'hidden', paddingBottom: 5, zIndex: 99 }}>
                            <View style={styles.filtersWrapper}>
                                <Filters />
                            </View>
                        </View>
                    }
                </Animated.View>

            </>
        );
    };

    const renderTabView = () => {
        return (
            <TabView
                onIndexChange={(index) => setIndex(index)}
                navigationState={{ index: tabIndex, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                initialLayout={{
                    height: 0,
                    width: Dimensions.get('window').width,
                }}
                style={{ marginBottom: 60 }}
            />
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={modals ? 'rgba(0, 0, 0, 0.2)' : '#ffffff'}
                barStyle='dark-content'
            />
            {renderTabView()}
            {renderHeader()}
            {tabIndex === 1 && <ShoppingCart />}
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
                            numberOfLines={5}
                            placeholderTextColor={Colors.black}
                            onChangeText={onChangeTextHandler}
                            style={[styles.textInput, { fontFamily: /\S/.test(inputPost) ? 'Lato-Regular' : 'Lato-Light' }]}
                            onContentSizeChange={e => {
                                if (e.nativeEvent.contentSize.height <= 121) {
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
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        top: 0,
        width: '100%',
        position: 'absolute'
    },
    headerContainer: {
        height: HeaderHeight,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        zIndex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        height: 57
    },
    label: {
        width: 65,
        fontSize: 16,
        color: Colors.black,
        fontFamily: 'Lato-Regular'
    },
    tab: {
        backgroundColor: '#fff',
    },
    indicator: {
        backgroundColor: Colors.black
    },
    headerAvatar: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2
    },
    titleWrapper: {
        backgroundColor: '#ffffff',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Lato-Bold',
        color: '#333333',
        fontSize: 16
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
    },
    paddingHorizontal: {
        paddingHorizontal: 15,
    },
    post: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingVertical: 15,
    },
    postHeader: {
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
    filtersWrapper: {
        paddingTop: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingLeft: 15
    }
});

export default GroupScreen;

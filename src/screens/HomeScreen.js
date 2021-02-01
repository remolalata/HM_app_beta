import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

// CONSTANTS
import Colors from '../constants/colors';

// COMPONENTS
import Header from '../components/Header';

// DATA
import { DUMMYPOST, DUMMYGROUP } from '../data/dummy-data';

// COMPONENTS
import Post from '../components/Post';
import GroupDiscover from '../components/GroupDiscover';

const TabBarHeight = 48;
const HeaderHeight = 57;

const TabScene = ({
    numCols,
    data,
    renderItem,
    onGetRef,
    scrollY,
    onScrollEndDrag,
    onMomentumScrollEnd,
    onMomentumScrollBegin,
    onPress
}) => {
    const windowHeight = Dimensions.get('window').height;

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
            ItemSeparatorComponent={() => <View style={{ height: 8, backgroundColor: Colors.lightGrey }} />}
            ListHeaderComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{
                paddingTop: HeaderHeight + TabBarHeight,
                // paddingHorizontal: 10
                minHeight: windowHeight - TabBarHeight,
                backgroundColor: '#ffffff',
            }}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const HomeScreen = props => {

    const { navigation } = props;

    const [tabIndex, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home' },
        { key: 'discover', title: 'Discover' },
    ]);
    const scrollY = useRef(new Animated.Value(0)).current;
    let listRefArr = useRef([]);
    let listOffset = useRef({});
    let isListGliding = useRef(false);

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, [routes, tabIndex]);

    const viewGroupHandler = () => {
        navigation.navigate('Group');
    }

    const goToProfileHandler = () => {
        navigation.navigate('Profile')
    }

    const goBack = () => {
        navigation.goBack();
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

    const renderHeader = () => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [0, -HeaderHeight],
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View style={[styles.header, { transform: [{ translateY: y }] }]}>
                <Header onPress={goToProfileHandler} goBack={goBack} />
            </Animated.View>
        );
    };

    const renderHome = ({ item, index }) => <Post item={item} onPress={viewGroupHandler} /> 

    const renderDiscover = ({ item, index }) => <GroupDiscover group={item} />

    const renderLabel = ({ route, focused }) => {
        return (
            <Text
                style={[
                    styles.label,
                    {
                        fontFamily: focused ? 'Lato-Bold' : 'Lato-Regular'
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
        switch (route.key) {
            case 'home':
                numCols = 1;
                data = DUMMYPOST;
                renderItem = renderHome;
                onPress = viewGroupHandler;
                break;
            case 'discover':
                numCols = 1;
                data = DUMMYGROUP;
                renderItem = renderDiscover;
                onPress = viewGroupHandler;
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
            />
        );
    };

    const renderTabBar = (props) => {
        const y = scrollY.interpolate({
            inputRange: [0, HeaderHeight],
            outputRange: [HeaderHeight, 0],
            extrapolateRight: 'clamp',
        });
        return (
            <Animated.View
                style={{
                    top: 0,
                    zIndex: 1,
                    position: 'absolute',
                    transform: [{ translateY: y }],
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
            </Animated.View>
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
            />
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {renderTabView()}
            {renderHeader()}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        top: 0,
        height: HeaderHeight,
        width: '100%',
        position: 'absolute',
    },
    label: {
        width: 65,
        fontSize: 16,
        color: Colors.black,
        fontFamily: 'Lato-Regular'
    },
    tab: {
        backgroundColor: '#ffffff'
    },
    indicator: {
        backgroundColor: Colors.black
    }
});

export default HomeScreen;

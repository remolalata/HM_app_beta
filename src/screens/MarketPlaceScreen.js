import React, { useEffect } from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    StatusBar
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/colors';

import MarketPlaceHeader from '../components/MarketPlaceHeader';
import Filters from '../components/Marketplace/Filters';
import Item from '../components/Marketplace/Item';
import ShoppingCart from '../components/Marketplace/ShoppingCart';
import NewPost from '../components/NewPost';

import { setActiveTab, displayAds } from '../store/actions/utils';
import { getData, selectedProduct } from '../store/actions/products';

const MarketPlaceScreen = props => {

    const { navigation } = props;

    const activeTab = useSelector((state) => state.utils.activeTab);
    const productsList = useSelector((state) => state.products.products);
    const productId = useSelector((state) => state.products.selectedProduct);
    const modals = useSelector(state => state.modals.newPost);
    const marketplaceFilters = useSelector(state => state.utils.marketplaceFilters);

    let filteredProducts = productsList;

    if (marketplaceFilters.price === 'LTH') {
        filteredProducts = productsList.sort((a, b) => a.raw_price - b.raw_price);
    } else {
        filteredProducts = productsList.sort((a, b) => b.raw_price - a.raw_price);
    }

    const dispatch = useDispatch();

    const goToProfileHandler = () => {
        navigation.navigate('Profile')
    }

    const goBackHandler = () => {
        dispatch(setActiveTab('HOME'));
        navigation.navigate('Home');
    }

    const goToProductScreenHandler = id => {
        dispatch(selectedProduct(id));
        dispatch(displayAds(false));
        navigation.navigate('Product');
    }

    useEffect(() => {
        firestore()
            .collection('products')
            .get()
            .then(querySnapshot => {
                let data = [];
                if (querySnapshot.size) {
                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().group === '1') {
                            let assembledSnapshot = documentSnapshot.data();
                            assembledSnapshot.id = documentSnapshot.id;
                            data.push(assembledSnapshot);
                        }
                    })
                }

                dispatch(getData(data));
            });
    }, []);

    const renderItem = data => {
        const {
            item: {
                title,
                price,
                description,
                address,
                ratings,
                id
            }
        } = data;

        return (
            <Item
                id={id}
                title={title}
                price={price}
                description={description}
                address={address}
                ratings={ratings}
                goToProduct={goToProductScreenHandler}
            />

        )
    }

    return (
        <>
            <StatusBar
                backgroundColor={modals ? 'rgba(0, 0, 0, 0.2)' : '#ffffff'}
                barStyle='dark-content'
            />
            <View style={styles.screen}>
                <MarketPlaceHeader
                    goToProfile={goToProfileHandler}
                    goBack={goBackHandler}
                    search={true}
                />
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Marketplace</Text>
                </View>
                <View style={{ overflow: 'hidden', paddingBottom: 5, zIndex: 99 }}>
                    <View style={styles.filterWrapper}>
                        <Filters />
                    </View>
                </View>
                <FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ marginTop: -9, zIndex: 1 }}
                />
                <ShoppingCart bottom={20} />
            </View>
            {modals && <NewPost />}
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    titleWrapper: {
        marginTop: 15,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black
    },
    filterWrapper: {
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

export default MarketPlaceScreen;
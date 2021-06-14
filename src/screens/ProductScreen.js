import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Colors from '../constants/colors';

import { selectedProduct } from '../store/actions/products';

import MarketPlaceHeader from '../components/MarketPlaceHeader';
import Ratings from '../components/Marketplace/Ratings';
import ShoppingCart from '../components/Marketplace/ShoppingCart';

const windowWidth = Dimensions.get('window').width;

const ProductScreen = props => {

    const { navigation } = props;

    const productsList = useSelector((state) => state.products.products);
    const groupProductsList = useSelector((state) => state.products.groupProducts);
    const productId = useSelector((state) => state.products.selectedProduct);
    const displayAds = useSelector((state) => state.utils.displayAds);

    console.log(displayAds)

    let image = '';

    switch (productId) {
        case '9aGXvz0blmxos3OXyLzc':
            image = require('../assets/images/products/9aGXvz0blmxos3OXyLzc.png');
            break;
        case 'GI4YhgFQUk4etT7Gz27v':
            image = require('../assets/images/products/GI4YhgFQUk4etT7Gz27v.png');
            break;
        case 'Kh401zSxBNd54q5Sj3Ny':
            image = require('../assets/images/products/Kh401zSxBNd54q5Sj3Ny.png');
            break;
        case 'uY64uTj5Z5ndXFfUWW2w':
            image = require('../assets/images/products/uY64uTj5Z5ndXFfUWW2w.png');
            break;
        case 'zoObnFRiQLUUi0XXpFmf':
            image = require('../assets/images/products/zoObnFRiQLUUi0XXpFmf.png');
            break;
        case 'D67Y5QwRN911QyygW0p4':
            image = require('../assets/images/products/D67Y5QwRN911QyygW0p4.png');
            break;
        case 'IZSujtHPpykOzhfMJfMV':
            image = require('../assets/images/products/IZSujtHPpykOzhfMJfMV.png');
            break;
        case 'QKBquHIxmNL7RxS6o6fW':
            image = require('../assets/images/products/QKBquHIxmNL7RxS6o6fW.png');
            break;
        case 'mbmpSQhbQOYWoIjr7k27':
            image = require('../assets/images/products/mbmpSQhbQOYWoIjr7k27.png');
            break;
        case 'KsPiGCAxGTtBdYGJG8TJ':
            image = require('../assets/images/products/KsPiGCAxGTtBdYGJG8TJ.png');
            break;
        case 'Rc4spXRhmqht3RBOWC2C':
            image = require('../assets/images/products/Rc4spXRhmqht3RBOWC2C.png');
            break;
        case 'E7WPAJgUVIg4IfAxboUc':
            image = require('../assets/images/products/E7WPAJgUVIg4IfAxboUc.png');
            break;
        case 'l4jKsYpk2FQKhdyJRI0I':
            image = require('../assets/images/products/l4jKsYpk2FQKhdyJRI0I.png');
            break;
        case 'Te6CDozMGzcR3CRI0wCJ':
            image = require('../assets/images/products/Te6CDozMGzcR3CRI0wCJ.png');
            break;
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState([
        {
            title: "Item 1",
            text: "Text 1",
        },
        {
            title: "Item 2",
            text: "Text 2",
        },
        {
            title: "Item 3",
            text: "Text 3",
        },
        {
            title: "Item 4",
            text: "Text 4",
        },
        {
            title: "Item 5",
            text: "Text 5",
        },
    ]);
    const ref = useRef(null);

    const combineProducts = productsList.concat(groupProductsList)

    const getProduct = combineProducts.find(x => x.id === productId);

    const dispatch = useDispatch();

    const goToProfileHandler = () => {
        navigation.navigate('Profile')
    }

    const goBackHandler = () => {
        navigation.goBack();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{
                height: 265,
            }}>
                <Image source={image} style={{ resizeMode: 'cover', width: windowWidth, height: 265 }} />
            </View>

        )
    }

    const pagination = () => {
        return (
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }

    return (
        <>
            <ScrollView style={styles.screen} >
                <MarketPlaceHeader
                    goToProfile={goToProfileHandler}
                    goBack={goBackHandler}
                    search={false}
                />
                <Carousel
                    ref={ref}
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth}
                />
                <Pagination
                    dotsLength={carouselItems.length}
                    activeDotIndex={activeIndex}
                    containerStyle={styles.carouselPagination}
                    dotStyle={{
                        width: 5,
                        height: 5,
                        borderRadius: 5 / 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
                <View style={styles.productInfoWrapper}>
                    <View style={styles.productInfo}>
                        <View>
                            <Text style={styles.price}>{getProduct.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>{getProduct.title}</Text>
                        </View>
                        <View style={styles.ratingsWrapper}>
                            <Ratings ratings={getProduct.ratings} />
                        </View>
                        <View>
                            <Text style={styles.address}>{getProduct.address}</Text>
                        </View>
                    </View>
                    <View style={styles.productActions}>
                        <View style={styles.bookmarkWrapper}>
                            <Icon name='bookmark' size={20} color={Colors.blue} />
                        </View>
                        <View>
                            <Icon name='external-link' size={18} color={Colors.blue} />
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionWrapper}>
                    <View>
                        <Text style={styles.descriptionLabel}>Description</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 16 }}>
                        <Text style={[styles.productCondition, { marginRight: 15 }]}>Condition</Text>
                        <Text style={styles.productCondition}>Used - Like New</Text>
                    </View>
                    <View>
                        <Text style={styles.descriptionBody}>Black Metal Adjustable Swivel Arm Work Desk Lamp With Bowl Shade</Text>
                        <View style={{ height: 15 }}></View>
                        <Text style={styles.descriptionBody}>Apart from a desk, a decent chair and a computer to work on, the home workspace doesn’t need much else, but there are few stranger sights than a desk without a lamp. Romanticized from their affiliation with architects, sketch artists and other creative people whose jobs probably no longer require a lamp, the desk lamp is something of a reference point for a person’s taste.</Text>
                        <View style={{ height: 15 }}></View>
                        <Text style={styles.descriptionBody}>You can either stand this lamp up on its own  you can clamp it onto any surface either vertical or horizontal up to 2” wide. For places like the school, dorm room, office, bedroom.</Text>
                        <View style={{ height: 15 }}></View>
                        <Text style={styles.descriptionBody}>-FLEXIBILITY: Light up a large area and move its position with the flexible spring-balanced adjusted arm that can extend up to 18" and the rotatable base and shade.</Text>
                        <Text style={styles.descriptionBody}>-PREMIUM QUALITY: The lamp stands firmly thanks to the weighted base and the swing arm and lamp shade are made from solid metal with a black finish, making them durable and exquisite to look at. The power plug is UL-listed, making it safe to use.</Text>
                        <Text style={styles.descriptionBody}>-USER-FRIENDLY: Its slim shape and 51” power cable means you can place it anywhere without taking up too much space and the easy to use on/off rocker switch ensures day-to-day use.</Text>
                    </View>
                </View>
                <View style={styles.sellerInformationWrapper}>
                    <View>
                        <Text style={styles.sellerInformationLabel}>Seller Information</Text>
                    </View>
                    <View style={styles.sellerInformationContent}>
                        <View style={styles.sellerInformation}>
                            <View>
                                <Image source={require('../assets/images/seller_information_avatar.png')} style={styles.sellerAvatar} />
                            </View>
                            <View>
                                <Text style={styles.sellerName}>Kristie Yen</Text>
                                <Text style={styles.sellerAccountAge}>Joined Happymoppet in 2010</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.followBtn}>
                                <Text style={styles.btnTxt}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.advertisementWrapper}>
                    <View style={styles.advertisementHeader}>
                        <Text style={styles.advertisementLabel}>Advertisement</Text>
                        <TouchableOpacity>
                            <Icon2 name='more-horizontal' size={25} color={Colors.lightGrey} />
                        </TouchableOpacity>
                    </View>
                    {displayAds && <View>
                        <Image source={require('../assets/images/bakal_bikes/bakal_bike_ads.png')} />
                    </View>}

                </View>
            </ScrollView>
            <ShoppingCart bottom={80} right={25} />
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity>
                        <Icon2 name='heart' size={25} color={Colors.blue} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity>
                        <Icon2 name='message-circle' size={25} color={Colors.blue} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.footerBtn, { backgroundColor: Colors.blue }]}>
                        <Text style={[styles.btnTxt, { color: '#ffffff' }]}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.footerBtn}>
                        <Text style={styles.btnTxt}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    productInfoWrapper: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 5,
        borderBottomColor: Colors.lightGrey
    },
    productInfo: {
        width: '60%'
    },
    productActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookmarkWrapper: {
        marginRight: 10
    },
    ratingsWrapper: {
        marginVertical: 5
    },
    price: {
        fontFamily: 'Lato-Bold',
        color: Colors.black,
        fontSize: 18
    },
    title: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black
    },
    address: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    descriptionWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderBottomColor: Colors.lightGrey
    },
    descriptionLabel: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    productCondition: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: Colors.black
    },
    descriptionBody: {
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        color: Colors.black
    },
    sellerInformationWrapper: {
        borderBottomWidth: 5,
        borderBottomColor: Colors.lightGrey,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 20
    },
    sellerInformationContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    sellerInformation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sellerInformationLabel: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: '#000000'
    },
    sellerAvatar: {
        width: 38,
        height: 38,
        resizeMode: 'cover',
        borderRadius: 38 / 2,
        marginRight: 10
    },
    sellerName: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.black
    },
    sellerAccountAge: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    followBtn: {
        borderWidth: 2,
        borderColor: Colors.blue,
        width: 110,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    advertisementWrapper: {
        padding: 15,
        height: 400
    },
    advertisementHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    advertisementLabel: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: '#000000'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 20
    },
    footerBtn: {
        borderWidth: 2,
        borderColor: Colors.blue,
        borderRadius: 10,
        width: 110,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTxt: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        color: Colors.blue
    },
    carouselPagination: {
        position: 'absolute',
        width: '100%',
        paddingVertical: 5,
        top: 307
    }
});

export default ProductScreen;
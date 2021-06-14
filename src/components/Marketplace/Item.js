import React, { useEffect } from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Colors from '../../constants/colors';

import Ratings from './Ratings';

const windowWidth = Dimensions.get('window').width;

const Item = props => {

    const {
        title,
        price,
        description,
        address,
        ratings,
        id,
        goToProduct
    } = props;

    let image = '';

    switch (id) {
        case '9aGXvz0blmxos3OXyLzc':
            image = require('../../assets/images/products/9aGXvz0blmxos3OXyLzc.png');
            break;
        case 'GI4YhgFQUk4etT7Gz27v':
            image = require('../../assets/images/products/GI4YhgFQUk4etT7Gz27v.png');
            break;
        case 'Kh401zSxBNd54q5Sj3Ny':
            image = require('../../assets/images/products/Kh401zSxBNd54q5Sj3Ny.png');
            break;
        case 'uY64uTj5Z5ndXFfUWW2w':
            image = require('../../assets/images/products/uY64uTj5Z5ndXFfUWW2w.png');
            break;
        case 'zoObnFRiQLUUi0XXpFmf':
            image = require('../../assets/images/products/zoObnFRiQLUUi0XXpFmf.png');
            break;
        case 'D67Y5QwRN911QyygW0p4':
            image = require('../../assets/images/products/D67Y5QwRN911QyygW0p4.png');
            break;
        case 'IZSujtHPpykOzhfMJfMV':
            image = require('../../assets/images/products/IZSujtHPpykOzhfMJfMV.png');
            break;
        case 'QKBquHIxmNL7RxS6o6fW':
            image = require('../../assets/images/products/QKBquHIxmNL7RxS6o6fW.png');
            break;
        case 'mbmpSQhbQOYWoIjr7k27':
            image = require('../../assets/images/products/mbmpSQhbQOYWoIjr7k27.png');
            break;
        case 'KsPiGCAxGTtBdYGJG8TJ':
            image = require('../../assets/images/products/KsPiGCAxGTtBdYGJG8TJ.png');
            break;
        case 'Rc4spXRhmqht3RBOWC2C':
            image = require('../../assets/images/products/Rc4spXRhmqht3RBOWC2C.png');
            break;
        case 'E7WPAJgUVIg4IfAxboUc':
            image = require('../../assets/images/products/E7WPAJgUVIg4IfAxboUc.png');
            break;
        case 'l4jKsYpk2FQKhdyJRI0I':
            image = require('../../assets/images/products/l4jKsYpk2FQKhdyJRI0I.png');
            break;
        case 'Te6CDozMGzcR3CRI0wCJ':
            image = require('../../assets/images/products/Te6CDozMGzcR3CRI0wCJ.png');
            break;
    }

    return (
        <TouchableOpacity onPress={() => goToProduct(id)}>
            <View style={styles.item}>
                <View style={styles.imageWrapper}>
                    <Image source={image} style={styles.image} />
                </View>
                <View style={styles.itemContent}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                    <View>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.ratingWrapper}>
                        <Ratings ratings={ratings} />
                    </View>
                    <View>
                        <Text style={styles.address}>{address}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderTopWidth: 5,
        borderTopColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageWrapper: {
        width: 165,
        height: 165
    },
    image: {
        width: 165,
        height: 165,
        resizeMode: 'cover'
    },
    itemContent: {
        marginHorizontal: 15,
        width: windowWidth - 190
    },
    title: {
        fontFamily: 'Lato-Regular',
        color: Colors.black,
        fontSize: 12
    },
    price: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: Colors.black,
        marginVertical: 3
    },
    description: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        color: Colors.black
    },
    address: {
        fontFamily: 'Lato-Light',
        fontSize: 10,
        color: Colors.black
    },
    ratingWrapper: {
        marginTop: 15,
        marginBottom: 5,
    }
});

export default Item;
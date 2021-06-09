import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import ShoppingCartIcon from '../../assets/images/Shopping Cart.svg';

const ShoppingCart = props => {

    const { bottom, right } = props;

    const styles = StyleSheet.create({
        shoppingCart: {
            position: 'absolute',
            bottom: bottom ? bottom : 80,
            right: right ? right : 25,
            width: 45,
            height: 45,
            backgroundColor: '#ffffff',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            zIndex: 9999
        },
        shoppingCartLabel: {
            position: 'absolute',
            bottom: 35,
            right: -8,
            backgroundColor: 'red',
            width: 15,
            height: 15,
            borderRadius: 15 / 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        shoppingCartLabelText: {
            fontFamily: 'Lato-Bold',
            fontSize: 10,
            color: '#ffffff'
        },
    });

    return (
        <TouchableOpacity style={styles.shoppingCart}>
            <View style={styles.shoppingCartLabel}>
                <Text style={styles.shoppingCartLabelText}>3</Text>
            </View>
            <ShoppingCartIcon width={24} height={24} />
        </TouchableOpacity>
    )
}

export default ShoppingCart;


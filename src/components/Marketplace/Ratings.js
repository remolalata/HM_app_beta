import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/colors';

const Ratings = props => {
    const { ratings } = props;

    return (
        <View style={styles.container}>
            <View style={styles.ratingStars}>
                <Icon name='star' style={styles.star} color={Colors.yellow} size={10} />
                <Icon name='star' style={styles.star} color={Colors.yellow} size={10} />
                <Icon name='star' style={styles.star} color={Colors.yellow} size={10} />
                <Icon name='star' style={styles.star} color={Colors.yellow} size={10} />
                <Icon name='star-o' style={styles.star} color={Colors.grey} size={10} />
            </View>
            <View>
                <Text style={styles.ratingCount}>({ratings.length})</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingStars: {
        flexDirection: 'row',
        marginRight: 5
    },
    star: {
        marginRight: 2
    },
    ratingCount: {
        fontFamily: 'Lato-Light',
        fontSize: 10,
        color: Colors.black
    }
});

export default Ratings;
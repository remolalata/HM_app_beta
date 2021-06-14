import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import Filter from './Filter';

const Filters = props => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.filterWrapper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.filter}>
                    <Filter name='Price' />
                </View>
                <View style={styles.filter}>
                    <Filter name='Rating' />
                </View>
                <View style={styles.filter}>
                    <Filter name='Location' />
                </View>
                <View style={styles.filter}>
                    <Filter name='Brand' />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    filterWrapper: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    filter: {
        marginRight: 8
    }
});

export default Filters;
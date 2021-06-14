import React, { useEffect } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';

import { setMarketplaceFilters } from '../../store/actions/utils';

import Colors from '../../constants/colors';

const Filter = props => {
    const { name } = props;

    const marketplaceFilters = useSelector(state => state.utils.marketplaceFilters);

    const dispatch = useDispatch();

    const onClickFilterHander = filterName => {
        dispatch(setMarketplaceFilters(filterName))
    }

    let renderIcon = null;

    if (name === 'Price') {
        if (marketplaceFilters.price === 'HTL') {
            renderIcon = <Icon name='caretup' size={10} color={Colors.grey} />
        } else {
            renderIcon = <Icon name='caretdown' size={10} color={Colors.grey} />
        }
    } else {
        renderIcon = <Icon name='caretdown' size={10} color={Colors.grey} />
    }

    return (
        <TouchableOpacity
            style={[styles.filterBtn, {
                backgroundColor: (name === 'Price' && marketplaceFilters.price === 'HTL') ? '#f5f5f5' : '#f5f5f5'
            }]} 
            onPress={() => onClickFilterHander(name)}
        >
            <Text 
                style={[styles.filterText, {
                    color: (name === 'Price' && marketplaceFilters.price === 'HTL') ? Colors.black : Colors.black
                }]}
            >
                {name}
            </Text>
            {renderIcon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
        height: 20,
        borderRadius: 8
    },
    filterText: {
        fontFamily: 'Lato-Light',
        fontSize: 12,
        lineHeight: 20,
        marginRight: 5
    }
});

export default Filter;
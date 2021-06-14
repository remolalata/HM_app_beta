import { SET_ACTIVE_TAB, DISPLAY_ADS, SET_MARKETPLACE_FILTERS, SET_DISPLAY_FILTERS } from '../actions/utils';

const initialState = {
    activeTab: 'HOME',
    displayAds: false,
    displayFilters: false,
    marketplaceFilters: {
        price: 'LTH', // LOW TO HIGH,
        rating: 'LTH'
    }
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return { ...state,  activeTab: action.data }
        case DISPLAY_ADS:
            return { ...state, displayAds: action.data }
        case SET_DISPLAY_FILTERS:
            return { ...state, displayFilters: action.data }
        case SET_MARKETPLACE_FILTERS:
            let filter;

            if (action.data === 'Price') {
                if (state.marketplaceFilters.price === 'LTH') {
                    filter = { price: 'HTL' }
                } else {
                    filter = { price: 'LTH' }
                }
            }

            if (action.data === 'Rating') {
                if (state.marketplaceFilters.rating === 'LTH') {
                    filter = { rating: 'HTL' }
                } else {
                    filter = { rating: 'LTH' }
                }
            }

            return { ...state, marketplaceFilters: { ...state.marketplaceFilters, ...filter } }
        default:
            return state
    }
};

export default utilsReducer;
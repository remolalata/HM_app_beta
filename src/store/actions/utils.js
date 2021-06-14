export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const DISPLAY_ADS = 'DISPLAY_ADS';
export const SET_MARKETPLACE_FILTERS = 'SET_MARKETPLACE_FILTERS';
export const SET_DISPLAY_FILTERS = 'SET_DISPLAY_FILTERS';

export const setActiveTab = data => {
    return {
        type: SET_ACTIVE_TAB,
        data: data
    }
}

export const displayAds = data => {
    return {
        type: DISPLAY_ADS,
        data: data
    }
}

export const setMarketplaceFilters = data => {
    return {
        type: SET_MARKETPLACE_FILTERS,
        data: data
    }
}

export const setDisplayFilters = data => {
    return {
        type: SET_DISPLAY_FILTERS,
        data: data
    }
}
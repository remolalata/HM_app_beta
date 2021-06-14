export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const DISPLAY_ADS = 'DISPLAY_ADS'

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
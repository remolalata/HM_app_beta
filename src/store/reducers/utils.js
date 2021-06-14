import { SET_ACTIVE_TAB, DISPLAY_ADS } from '../actions/utils';

const initialState = {
    activeTab: 'HOME',
    displayAds: false
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return { ...state,  activeTab: action.data }
        case DISPLAY_ADS:
            return { ...state, displayAds: action.data }
        default:
            return state
    }
};

export default utilsReducer;
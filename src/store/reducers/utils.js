import { SET_ACTIVE_TAB } from '../actions/utils';

const initialState = {
    activeTab: 'HOME'
};

const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            return { ...state,  activeTab: action.data }
        default:
            return state
    }
};

export default utilsReducer;
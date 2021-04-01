import { TOGGLE_NEWPOST, TOGGLE_LOGIN } from "../actions/modals";

const initialState = {
    newPost: false
};

const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NEWPOST:
            return { ...state, newPost: !state.newPost }
        case TOGGLE_LOGIN:
            return { ...state, login: !state.login }
        default:
            return state
    }
};

export default modalsReducer;
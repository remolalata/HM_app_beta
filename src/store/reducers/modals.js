import { TOGGLE_NEWPOST } from "../actions/modals";

const initialState = {
    newPost: false
};

const modalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NEWPOST:
            return { ...state, newPost: !state.newPost }
        default:
            return state
    }
};

export default modalsReducer;
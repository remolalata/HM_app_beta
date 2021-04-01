import { LOGIN_USER, LOGOUT_USER } from "../actions/user";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, user: action.data };
        case LOGOUT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default userReducer;
export const TOGGLE_NEWPOST = 'TOGGLE_NEWPOST';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export const toggleNewPost = (bool) => {
    return {
        type: TOGGLE_NEWPOST,
        isVisible: bool
    }
};

export const toggleLogin = (bool) => {
    return {
        type: TOGGLE_LOGIN,
        isVisible: bool
    }
};
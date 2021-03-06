export const TOGGLE_NEWPOST = 'TOGGLE_NEWPOST';

export const toggleNewPost = (bool) => {
    return {
        type: TOGGLE_NEWPOST,
        isVisible: bool
    }
};
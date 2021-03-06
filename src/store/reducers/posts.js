import { DUMMYPOST, DUMMYGROUPPOST } from '../../data/dummy-data';

const initialState = {
    posts: DUMMYPOST,
    groupPosts: DUMMYGROUPPOST
};

const postsReducer = (state = initialState, action) => {
    return state;
};

export default postsReducer;
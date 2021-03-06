import { DUMMYUSERS } from '../../data/dummy-data';

const initialState = {
    users: DUMMYUSERS,
};

const usersReducer = (state = initialState, action) => {
    return state;
};

export default usersReducer;
import { DUMMYGROUP, DUMMYGROUP2, DUMMYGROUPPOST } from '../../data/dummy-data';

const initialState = {
    groups: DUMMYGROUP,
    group2: DUMMYGROUP2
};

const groupsReducer = (state = initialState, action) => {
    return state;
};

export default groupsReducer;
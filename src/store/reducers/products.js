import { GET_DATA, SELECTED_PRODUCT, GET_GROUP_DATA } from '../actions/products';

const initialState = {
    products: [],
    groupProducts: [],
    selectedProduct: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, products: action.data };
        case GET_GROUP_DATA:
            return { ...state, groupProducts: action.data };
        case SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.id };
        default:
            return state;
    }
};

export default productsReducer;
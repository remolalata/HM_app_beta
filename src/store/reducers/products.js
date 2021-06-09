import { GET_DATA, SELECTED_PRODUCT } from '../actions/products';

const initialState = {
    products: [],
    selectedProduct: null
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return { ...state, products: action.data };
        case SELECTED_PRODUCT:
            return { ...state, selectedProduct: action.id };
        default:
            return state;
    }
};

export default productsReducer;
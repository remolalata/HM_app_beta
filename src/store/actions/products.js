export const GET_DATA = 'GET_DATA';
export const GET_GROUP_DATA = 'GET_GROUP_DATA';
export const SELECTED_PRODUCT = 'SELECTED_PRODUCT';

export const getData = data => {
    return {
        type: GET_DATA,
        data: data
    }
}

export const getGroupProduct = data => {
    return {
        type: GET_GROUP_DATA,
        data: data
    }
}

export const selectedProduct = id => {
    return {
        type: SELECTED_PRODUCT,
        id: id
    }
}
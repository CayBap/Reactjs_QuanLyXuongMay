import { IMPORT_PRODUCT_GET_SUCCESS, } from "../constants/actionType";

import { fromJS } from 'immutable';
export const initialState = fromJS({});

const importProduct = (state = initialState, action) => {
    switch (action.type) {
        case IMPORT_PRODUCT_GET_SUCCESS:
            state.importProducts = action.data;
            return {
                importProducts: state.importProducts
            }
    
        default: return [...state];
    }
}
export default importProduct;
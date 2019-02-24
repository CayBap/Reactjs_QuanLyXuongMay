import {   EXPORT_PRODUCT_GET_SUCCESS } from "../constants/actionType";
import { fromJS } from 'immutable';
export const initialState = fromJS({});

const exportProduct = (state = initialState, action) => {
    switch (action.type) {
        case EXPORT_PRODUCT_GET_SUCCESS:
            state.exportProducts = action.data;
            return {
                ...state,
                // exportProducts: state.exportProduct,
              };
        default: return [...state];
    }
}
export default exportProduct;
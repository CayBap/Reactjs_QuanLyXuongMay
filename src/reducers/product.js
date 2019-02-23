import {   PRODUCT_GET_SUCCESS } from "../constants/actionType";
import { fromJS } from 'immutable';
export const initialState = fromJS({});
const product = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_GET_SUCCESS:
            state.products = action.data;
            return {
                products: state.products
            }
        default: return [...state];
    }
}
export default product;
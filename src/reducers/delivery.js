import {   DELIVERY_GET_SUCCESS } from "../constants/actionType";
import { fromJS } from 'immutable';
export const initialState = fromJS({});

const delivery = (state = initialState, action) => {
    switch (action.type) {
        case DELIVERY_GET_SUCCESS:
            state.deliverys = action.data;
            return {
                ...state,
              };
        default: return [...state];
    }
}
export default delivery;
import {  CATE_GET_SUCCESS } from "../constants/actionType";
import { fromJS } from 'immutable';
export const initialState = fromJS({});
const user = (state = initialState, action) => {
    switch (action.type) {
        case CATE_GET_SUCCESS:
            state.cates = action.data;
            return {
                ...state,
                cates: state.cates
            }
        default: return [...state];
    }
}
export default user;
import {
    PRODUCT_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetProductSuccess = (data) => {
    const type = PRODUCT_GET_SUCCESS;
    return {
        type,
        data
    };
};
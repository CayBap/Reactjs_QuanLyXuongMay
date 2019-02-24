import {
    EXPORT_PRODUCT_GET_SUCCESS,
    PRODUCT_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetExportProductSuccess = (data) => {
    const type = EXPORT_PRODUCT_GET_SUCCESS;
    return {
        type,
        data
    };
};
export const actGetProductSuccess = (data) => {
    const type = PRODUCT_GET_SUCCESS;
    return {
        type,
        data
    };
};
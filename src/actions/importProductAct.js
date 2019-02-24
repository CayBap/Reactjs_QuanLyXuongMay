import {
     IMPORT_PRODUCT_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetImportProductSuccess = (data) => {
    const type = IMPORT_PRODUCT_GET_SUCCESS;
    return {
        type,
        data
    };
};
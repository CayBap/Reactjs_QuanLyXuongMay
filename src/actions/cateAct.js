import {
    CATE_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetCateSuccess = (data) => {
    const type = CATE_GET_SUCCESS;
    return {
        type,
        data
    };
};
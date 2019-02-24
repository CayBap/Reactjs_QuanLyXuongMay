import {
    USER_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetUserSuccess = (data) => {
    const type = USER_GET_SUCCESS;
    return {
        type,
        data
    };
};
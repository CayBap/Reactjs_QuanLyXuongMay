import {
    LOGIN_SUCCESS
} from '../constants/actionType';

//act login
export const actLoginSuccess = (data) => {
    const type = LOGIN_SUCCESS;
    return {
        type,
        data
    };
};
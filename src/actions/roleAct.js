import {
    ROLE_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetRoleSuccess = (data) => {
    const type = ROLE_GET_SUCCESS;
    return {
        type,
        data
    };
};
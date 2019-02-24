import {
    DELIVERY_GET_SUCCESS
} from '../constants/actionType';

//act login
export const actGetDeliverySuccess = (data) => {
    const type = DELIVERY_GET_SUCCESS;
    return {
        type,
        data
    };
};
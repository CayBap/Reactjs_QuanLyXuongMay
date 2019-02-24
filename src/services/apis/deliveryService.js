import axios from '../../utils/axios';
import {
    DELIVERY
} from '../../constants/urlRequrest';

//login user
export const featchCreateDelivery = (body) => {
    return axios.post(DELIVERY, body);
}
export const featchGetDelivery = () => {
    return axios.get(DELIVERY, );
}
export const featchGetADelivery = (id) => {
    return axios.get(`${DELIVERY}/${id}` );
}
export const featchUpdateDelivery = (id,body) => {
    return axios.put(`${DELIVERY}/${id}`,body );
}
export const featchDeleteDelivery = (id) => {
    return axios.delete(`${DELIVERY}/${id}` );
}
export const featchUpdateStatusDelivery = (id) => {
    return axios.patch(`${DELIVERY}/${id}` );
}
import axios from '../../utils/axios';
import {
    PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateProduct = (body) => {
    return axios.post(PRODUCT, body);
}
export const featchGetProduct = () => {
    return axios.get(PRODUCT, );
}
export const featchGetAProduct = (id) => {
    return axios.get(`${PRODUCT}/${id}` );
}
export const featchUpdateProduct = (id,body) => {
    return axios.put(`${PRODUCT}/${id}`,body );
}
export const featchDeleteProduct = (id) => {
    return axios.delete(`${PRODUCT}/${id}` );
}
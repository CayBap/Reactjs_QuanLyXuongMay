import axios from '../../utils/axios';
import {
    PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateProduct = (body) => {
    return axios.post(PRODUCT, body);
}
export const featchGetProduct = () => {
    // return axios.get(PRODUCT, );
    return axios.get(PRODUCT,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetAProduct = (id) => {
    return axios.get(`${PRODUCT}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchUpdateProduct = (id,body) => {
    return axios.put(`${PRODUCT}/${id}`,body ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchDeleteProduct = (id) => {
    return axios.delete(`${PRODUCT}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
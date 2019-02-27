// import axios from '../../utils/axios';
import axios from 'axios';
import {
    IMPORT_PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateImportProduct = (body) => {
    return axios.post(IMPORT_PRODUCT, body);
}
export const featchGetImportProduct = () => {
    // return axios.get(IMPORT_PRODUCT, );
    return axios.get(IMPORT_PRODUCT, {
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchGetAImportProduct = (id) => {
    return axios.get(`${IMPORT_PRODUCT}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchUpdateImportProduct = (id,body) => {
    return axios.put(`${IMPORT_PRODUCT}/${id}`,body ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchDeleteImportProduct = (id) => {
    return axios.delete(`${IMPORT_PRODUCT}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
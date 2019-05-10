// import axios from '../../utils/axios';
import axios from 'axios';
import {
    EXPORT_PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateExportProduct = (body) => {
    return axios.post(EXPORT_PRODUCT, body);
}
export const featchGetExportProduct = () => {
    // return axios.get(EXPORT_PRODUCT, );
    return axios.get(EXPORT_PRODUCT,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetAExportProduct = (id) => {
    return axios.get(`${EXPORT_PRODUCT}/${id}` ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchUpdateExportProduct = (id, body) => {
    return axios.put(`${EXPORT_PRODUCT}/${id}`,body,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchDeleteExportProduct = (id) => {
    return axios.delete(`${EXPORT_PRODUCT}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
import axios from '../../utils/axios';
import {
    IMPORT_PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateImportProduct = (body) => {
    return axios.post(IMPORT_PRODUCT, body);
}
export const featchGetImportProduct = () => {
    return axios.get(IMPORT_PRODUCT, );
}
export const featchGetAImportProduct = (id) => {
    return axios.get(`${IMPORT_PRODUCT}/${id}` );
}
export const featchUpdateImportProduct = (id,body) => {
    return axios.put(`${IMPORT_PRODUCT}/${id}`,body );
}
export const featchDeleteImportProduct = (id) => {
    return axios.delete(`${IMPORT_PRODUCT}/${id}` );
}
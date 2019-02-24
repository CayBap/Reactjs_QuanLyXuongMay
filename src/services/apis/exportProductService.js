import axios from '../../utils/axios';
import {
    EXPORT_PRODUCT
} from '../../constants/urlRequrest';

//login user
export const featchCreateExportProduct = (body) => {
    return axios.post(EXPORT_PRODUCT, body);
}
export const featchGetExportProduct = () => {
    return axios.get(EXPORT_PRODUCT, );
}
export const featchGetAExportProduct = (id) => {
    return axios.get(`${EXPORT_PRODUCT}/${id}` );
}
export const featchUpdateExportProduct = (id, body) => {
    console.log(body)
    return axios.put(`${EXPORT_PRODUCT}/${id}`,body );
}
export const featchDeleteExportProduct = (id) => {
    return axios.delete(`${EXPORT_PRODUCT}/${id}` );
}
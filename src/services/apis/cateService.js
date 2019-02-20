import axios from '../../utils/axios';
import {
    CATE
} from '../../constants/urlRequrest';

//login user
export const featchCreateCate = (body) => {
    return axios.post(CATE, body);
}
export const featchGetCate = () => {
    return axios.get(CATE, );
}
export const featchGetACate = (id) => {
    return axios.get(`${CATE}/${id}` );
}
export const featchUpdateCate = (id,body) => {
    return axios.put(CATE, );
}
export const featchDeleteCate = (id) => {
    return axios.delete(`${CATE}/${id}` );
}
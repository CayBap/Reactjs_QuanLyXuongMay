// import axios from '../../utils/axios';
import axios from 'axios';
import {
    CATE
} from '../../constants/urlRequrest';

//login user
export const featchCreateCate = (body) => {
    return axios.post(CATE, body,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchGetCate = () => {
    return axios.get(CATE,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
    // return axios.get(CATE, );
}
export const featchGetACate = (id) => {
    return axios.get(`${CATE}/${id}`, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('jwt')
        }
    });
}
export const featchUpdateCate = (id, body) => {
    return axios.put(`${CATE}/${id}`, body, {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('jwt')
        }
    });
}
export const featchDeleteCate = (id) => {
    return axios.delete(`${CATE}/${id}` );
}
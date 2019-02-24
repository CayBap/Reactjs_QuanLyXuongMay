import axios from '../../utils/axios';
import {
    USER
} from '../../constants/urlRequrest';

//login user
export const featchCreateUser = (body) => {
    return axios.post(USER, body);
}
export const featchGetUser = () => {
    return axios.get(USER, );
}
export const featchGetAUser = (id) => {
    return axios.get(`${USER}/${id}` );
}
export const featchUpdateUser = (id, body) => {
    console.log(body)
    return axios.put(`${USER}/${id}`,body );
}
export const featchDeleteUser = (id) => {
    return axios.delete(`${USER}/${id}` );
}
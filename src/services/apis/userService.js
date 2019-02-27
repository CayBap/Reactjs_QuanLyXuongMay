import axios from '../../utils/axios';
import {
    USER
} from '../../constants/urlRequrest';

//login user
export const featchCreateUser = (body) => {
    return axios.post(USER, body);
}
export const featchGetUser = () => {
    return axios.get(USER,{
        
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetAUser = (id) => {
    return axios.get(`${USER}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
   
}
export const featchGetBoard = () => {
    return axios.get(`${USER}/boardEmploy` ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchUpdateUser = (id, body) => {
    console.log(body)
    return axios.put(`${USER}/${id}`,body ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchDeleteUser = (id) => {
    return axios.delete(`${USER}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
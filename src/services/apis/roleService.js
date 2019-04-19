import axios from '../../utils/axios';
import {
    ROLE
} from '../../constants/urlRequrest';

//login role
export const featchCreateRole = (body) => {
    return axios.post(ROLE, body);
}
export const featchGetRole = () => {
    return axios.get(ROLE,{
        
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetARole = (id) => {
    return axios.get(`${ROLE}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
   
}
// export const featchGetBoard = () => {
//     return axios.get(`${ROLE}/boardEmploy` ,{
//         method: 'GET',
//         headers: { 'x-access-token': localStorage.getItem('jwt') },
//     });
// }
export const featchUpdateRole = (id, body) => {
    return axios.put(`${ROLE}/${id}`,body ,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchDeleteRole = (id) => {
    return axios.delete(`${ROLE}/${id}`,{
        method: 'GET',
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
// import axios from '../../utils/axios';
import axios from 'axios';
import {
    DELIVERY
} from '../../constants/urlRequrest';

//login user
export const featchCreateDelivery = (body) => {
    return axios.post(DELIVERY, body);
}
export const featchGetDelivery = () => {
    return axios.get(DELIVERY,{
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetDeliveryByUser = (idUser,query) => {
    return axios.get(DELIVERY+'/user/'+idUser,{
        params:query,
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetADelivery = (id) => {
    return axios.get(`${DELIVERY}/${id}`, {
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchUpdateDelivery = (id,body) => {
    return axios.put(`${DELIVERY}/${id}`,body,{
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchDeleteDelivery = (id) => {
    return axios.delete(`${DELIVERY}/${id}`,{
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchUpdateStatusDelivery = (id) => {
    return axios.patch(`${DELIVERY}/${id}`,{
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}

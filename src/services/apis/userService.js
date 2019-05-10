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
        

        headers: { 'x-access-token': localStorage.getItem('jwt') },
    })
}
export const featchGetAUser = (id) => {
    return axios.get(`${USER}/${id}`,{

        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
   
} 

export const featchGetBoard = (from,to) => {
    return axios.get(`${USER}/boardEmploy` ,{
        params: { 
            from,to  
          },
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchUpdateUser = (id, body) => {
    console.log(body)
    return axios.put(`${USER}/${id}`,body ,{

        headers: { 'x-access-token': localStorage.getItem('jwt') },
    });
}
export const featchDeleteUser = (id) => {
    return axios.delete(`${USER}/${id}`,{

        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchProfile = () => {
    return axios.get(`${USER}/profile`,{
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchAddLog = (body) => {
    return axios.post(`${USER}/addLog`, body, {
        headers: {
            'x-access-token': localStorage.getItem('jwt')
        },
    });
}
export const featchExport = (idUser,from,to) => {
    return axios.get(`${USER}/export/${idUser}`,{
        params: { 
         from,to  
       },
        headers: { 'x-access-token': localStorage.getItem('jwt') },
    } );
}
export const featchUpdateProfile = (body) => {
    const formData = new FormData();
    formData.append("avatar", body.avatar);
    formData.append("name", body.name);
    formData.append("firstName", body.firstName);
    formData.append("lastName", body.lastName);
    formData.append("adress", body.adress);
    formData.append("phone", body.phone);
    formData.append("gender", body.gender);
    formData.append("email", body.email);
    formData.append("dob", body.dob);
    return axios.put(`${USER}/profile`, formData, {
        headers: {
            'x-access-token': localStorage.getItem('jwt'),
            'Content-Type': 'multipart/form-data',
        },
    });
}
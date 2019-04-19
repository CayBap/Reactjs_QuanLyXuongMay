// import axios from '../../utils/axios';
import axios from 'axios';
import {
    COMPANY
} from '../../constants/urlRequrest';

//login user
export const featchCreateCompany = (body) => {
    const formData = new FormData();
    formData.append("avatar", body.avatar);
    formData.append("name", body.name);
    formData.append("shortName", body.shortName);
    formData.append("adress", body.adress);
    formData.append("phoneNumber", body.phoneNumber);
    formData.append("fax", body.fax);
    formData.append("email", body.email);
    return axios.post(COMPANY, formData, {
        headers: {
            'x-access-token': localStorage.getItem('jwt'),
            'Content-Type': 'multipart/form-data',
        },
    });
}
export const featchGetCompany = () => {
    return axios.get(COMPANY, {
        headers: {
            'x-access-token': localStorage.getItem('jwt')
        },
    })
    // return axios.get(COMPANY, );
}

import axiosBasic from '../../utils/axiosBasic';
import axios from '../../utils/axios';
import {
    LOGIN
} from '../../constants/urlRequrest';

//login user
export const featchLogin = (phone, password) => {

    const body = {
        phone: phone,
        password: password
    };
    return axios.post(LOGIN, body);
}
export const featchSignUp = async (phone, password, firstName, lastName) => {

    const body = {
        phone: phone,
        password: password,
        firstName: firstName,
        lastName: lastName,
    };
    try {
        return await axiosBasic.post(LOGIN, body);
    } catch (error) {
        return error;
    }
}
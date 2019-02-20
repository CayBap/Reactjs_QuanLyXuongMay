import axiosBasic from '../../utils/axiosBasic';
import {
    LOGIN
} from '../../constants/urlRequrest';

//login user
export const featchLogin = (phone, password) => {

    const body = {
        phone: phone,
        password: password
    };
    return axiosBasic.post(LOGIN, body);
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
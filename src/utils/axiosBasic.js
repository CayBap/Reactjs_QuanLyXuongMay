import axios from 'axios';
import { BASE_URL } from './../constants/urlRequrest';
// import * as constants from './constants';
const instance = axios.create({
    baseURL: BASE_URL,
    // timeout: constants.API_TIMEOUT,
    headers: {
                'Content-Type': 'application/json'
            }
});

// Now all requests using this instance will wait 2.5 seconds before timing out
// instance.defaults.headers.common['Content-Type'] = '*/*';


// instance.interceptors.request...
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    // toastr.error('[Request] Error.' + error);
    return Promise.reject(error);
});

// // Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
   return response;

}, function (error) {
    if(error.response.status === 403){
        alert('login false');
    }else if(error.response.status === 401){
        alert('login false');
    }
    return error.response;
});

export default instance;
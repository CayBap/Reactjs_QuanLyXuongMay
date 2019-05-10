import axios from 'axios';
import { BASE_URL } from '../constants/urlRequrest';
const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
                'x-access-token': localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
             }
});
// Now all requests using this instance will wait 2.5 seconds before timing out
// instance.defaults.timeout = 2500;
// instance.defaults.headers.common['Accept'] = 'application/json';
instance.defaults.headers.common['x-access-token'] = localStorage.getItem('jwt') || '';


// instance.interceptors.request...
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // check if token null => return login
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// // Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;

}, async function (error) {
    console.log(error.response)
    if( error.response.status === 403){
        localStorage.clear();
    } else if (error.response.status === 401) {
        // localStorage.clear();
    }
    return error.response;
});

export default instance;
import { LOGIN_SUCCESS,USER_GET_SUCCESS } from "../constants/actionType";

var initState = [];
const user = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('jwt', action.data.token);
            localStorage.setItem('phone', action.data.phone);
            return [...state];
        case USER_GET_SUCCESS:
            state.users = action.data;
            return {
                users:action.data
            };
        default: return [...state];
    }
}
export default user;
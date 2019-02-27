import { LOGIN_SUCCESS,USER_GET_SUCCESS } from "../constants/actionType";

var initState = [];
const user = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('jwt', action.data.token);
            localStorage.setItem('phone', action.data.phone);
            // console.log(action.data)
            localStorage.setItem('name', action.data.name);
            localStorage.setItem('id', action.data.id);
            localStorage.setItem('role', action.data.role);
            return {role:action.data.role}
        case USER_GET_SUCCESS:
            state.users = action.data;
            return {
                users:action.data
            };
        default: return [...state];
    }
}
export default user;
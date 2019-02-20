import { LOGIN_SUCCESS } from "../constants/actionType";

var initState = [];
const user = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('jwt', action.data.token);
            localStorage.setItem('phone', action.data.phone);
            return [...state];
        default: return [...state];
    }
}
export default user;
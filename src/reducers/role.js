import { ROLE_GET_SUCCESS } from "../constants/actionType";

var initState = [];
const role = (state = initState, action) => {
    switch (action.type) {
     
        case ROLE_GET_SUCCESS:
            state.roles = action.data;
            return {
                roles:action.data
            };
        default: return [...state];
    }
}
export default role;
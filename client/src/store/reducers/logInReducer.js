import { REQUEST_LOGIN } from '../actions/types';
import { POST_LOGIN } from '../actions/types';
import { ERROR_LOGIN } from '../actions/types';


const initState = {
    token: null,
    isLoading: false,
    error: null
};

export default function logInReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true
            };
        case POST_LOGIN:
            return {
                ...state,
                error: null,
                token: action.payload,
                isLoading: false
            };
        case ERROR_LOGIN:
            console.log("ERROR ATTEMPTING TO LOG IN", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };
        default:
            return state 
    }
}
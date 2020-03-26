import { REQUEST_REGISTERUSER } from '../actions/types';
import { POST_REGISTERUSER } from '../actions/types';
import { ERROR_REGISTERUSER } from '../actions/types';


const initState = {
    registerUser:[],
    isLoading: false,
    error: null
};

export default function registerUserReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_REGISTERUSER:
            return {
                ...state,
                isLoading: true
            };
        case POST_REGISTERUSER:
            return {
                ...state,
                error: null,
                registerUser: action.payload,
                isLoading: false
            };
        case ERROR_REGISTERUSER:
            console.log("ERROR AUTHENTICATING USER REGISTRATION", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };
        default:
            return state 
    }
}
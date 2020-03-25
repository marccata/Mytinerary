import { REQUEST_USER } from '../actions/types';
import { POST_USER } from '../actions/types';
import { ERROR_USER } from '../actions/types';


const initState = {
    user:[],
    isLoading: false,
    error: null
};

export default function citiesReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_USER:
            return {
                ...state,
                isLoading: true
            };
        case POST_USER:
            return {
                ...state,
                error: null,
                user: action.payload,
                isLoading: false
            };
        case ERROR_USER:
            console.log("ERROR POSTING USER DATA TO DATABASE", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };
        default:
            return state 
    }
}
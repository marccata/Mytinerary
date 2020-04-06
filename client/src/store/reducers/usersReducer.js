import { REQUEST_NEWUSER, POST_NEWUSER, ERROR_NEWUSER } from '../actions/types';
import { REQUEST_USERAUTH, POST_USERAUTH, ERROR_USERAUTH } from '../actions/types';
import { REQUEST_LOGIN, POST_LOGIN, ERROR_LOGIN } from '../actions/types';
import { REQUEST_LOGOUT, EXECUTE_LOGOUT, ERROR_LOGOUT } from '../actions/types';
import { REQUEST_FAV_ITINERARY, EXECUTE_FAV_ITINERARY, ERROR_FAV_ITINERARY } from '../actions/types';

const initState = { 
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated : false,
    token: null,
    uselessItemForTest: null
};

export default function usersReducer(state = initState, action) {
    switch (action.type) {
        // SIGN UP
        case REQUEST_NEWUSER:
            return {
                ...state,
                isLoading: true
            };
        case POST_NEWUSER:
            return {
                ...state,
                error: null,
                user: action.payload,
                isLoading: false
            };
        case ERROR_NEWUSER:
            console.log("ERROR POSTING USER DATA TO DATABASE", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };

        // LOGIN
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
                isLoading: false
            };

        // USER AUTHENTICATION
        case REQUEST_USERAUTH:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false
            };
        case POST_USERAUTH:
            return {
                ...state,
                error: null,
                user: action.payload,
                isLoading: false,
                isAuthenticated: true
            };
        case ERROR_USERAUTH:
            console.log("ERROR AUTHENTICATING USER REGISTRATION", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
                isAuthenticated: false
            };

        // USER LOGOUT
        case REQUEST_LOGOUT:
            return {
                ...state,
                isLoading: true,
            };
        case EXECUTE_LOGOUT:  
            return {
                ...state,
                error: null,
                user: null,
                isLoading: false,
                isAuthenticated: false,
                token: null
            };
        case ERROR_LOGOUT:
            console.log("ERROR MAKING LOGOUT", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };

        // FAVOURITE ITINERARY
        case REQUEST_FAV_ITINERARY:
            return {
                ...state,
                isLoading: true,
            };
        case EXECUTE_FAV_ITINERARY:  
            return {
                ...state,
                error: null,
                //uselessItemForTest: action.payload, // TODO IS THIS NEEDED?
                isLoading: false,
            };
        case ERROR_FAV_ITINERARY:
            console.log("ERROR EXECUTING FAVOURITE ITINERARY", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };

        default:
            return state 
    }
}
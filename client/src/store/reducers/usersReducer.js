import { REQUEST_NEWUSER } from '../actions/types';
import { POST_NEWUSER } from '../actions/types';
import { ERROR_NEWUSER } from '../actions/types';

import { REQUEST_USERAUTH } from '../actions/types';
import { POST_USERAUTH } from '../actions/types';
import { ERROR_USERAUTH } from '../actions/types';

import { REQUEST_LOGIN } from '../actions/types';
import { POST_LOGIN } from '../actions/types';
import { ERROR_LOGIN } from '../actions/types';


const initState = { 
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated : false,
    registerUser:[],
    token: null,
};

// TODO this reducer/action can be improved so at sign up you're already logged in also
export function signUpReducer(state = initState, action) {
    switch (action.type) {
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
        default:
            return state 
    }
}

export default function logInReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false
            };
        case POST_LOGIN:
            return {
                ...state,
                error: null,
                token: action.payload,
                isLoading: false,
                isAuthenticated: true
            };
        case ERROR_LOGIN:
            console.log("ERROR ATTEMPTING TO LOG IN", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
                isAuthenticated: false
            };
        default:
            return state 
    }
}

export function userAuthReducer(state = initState, action) {
    switch (action.type) {
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
                registerUser: action.payload,
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
        default:
            return state 
    }
}
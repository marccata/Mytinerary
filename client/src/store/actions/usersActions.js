import axios from 'axios';

import { REQUEST_USER } from './types';
import { POST_USER } from './types';
import { ERROR_USER } from './types';

import { REQUEST_LOGIN } from './types';
import { POST_LOGIN } from './types';
import { ERROR_LOGIN } from './types';

export function postUser(userEmail, userPassword, userUser_img) {
    return function(dispatch){

        dispatch({type:REQUEST_USER})

        axios.post('/api/users/', {
            email: userEmail,
            password: userPassword,
            user_img: userUser_img
        })
        
        .then(res => {
            dispatch({type:POST_USER, payload: res.data});
            console.log('POST USER WORKED');
            console.log(res.data);
        })

        .catch( error => {
            dispatch({type:ERROR_USER, error: error})
        });

    }
}

export function logInUser(userEmail, userPassword) {
    return function(dispatch){

        dispatch({type:REQUEST_LOGIN})

        axios.post('/api/login/', {
            email: userEmail,
            password: userPassword
        })
        .then(res => {
            dispatch({type:POST_LOGIN, payload: res.data.token});
            console.log('LOGIN EXECUTED');
            console.log(res.data);
            //Saves token to localstorage. If it already exists is gets silently overwritten.
            localStorage.setItem("userToken", JSON.stringify(res.data.token))
        })

        .catch( error => {
            dispatch({type:ERROR_LOGIN, error: error})
        });

    }
}
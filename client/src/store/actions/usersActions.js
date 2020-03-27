import axios from 'axios';

import { REQUEST_NEWUSER } from './types';
import { POST_NEWUSER } from './types';
import { ERROR_NEWUSER } from './types';

import { REQUEST_LOGIN } from './types';
import { POST_LOGIN } from './types';
import { ERROR_LOGIN } from './types';

import { REQUEST_USERAUTH } from './types';
import { POST_USERAUTH } from './types';
import { ERROR_USERAUTH } from './types';

export function postUser(userEmail, userPassword, userUser_img) {
    return function(dispatch){

        dispatch({type:REQUEST_NEWUSER})

        axios.post('/api/users/', {
            email: userEmail,
            password: userPassword,
            user_img: userUser_img
        })
        
        .then(res => {
            dispatch({type:POST_NEWUSER, payload: res.data});
            console.log('POST USER WORKED');
            console.log(res.data);
        })

        .catch( error => {
            dispatch({type:ERROR_NEWUSER, error: error})
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

export function registerUser(userToken) { //TODO Como cojo el token?

    return function(dispatch){

        dispatch({type:REQUEST_USERAUTH})

        // //if there is a token in localstorage do this
        // if (localStorage.getItem('userToken')) {
        //     var userToken = localStorage.getItem('userToken');
        //     var userToken = JSON.parse(userToken);
        //     dispatch({type:POST_USERAUTH, payload: userToken});   
        // }
        // //else make axios and save the token in localstorage
        // else {
            axios.get('/api/users/auth/', {
               headers:{
                Authorisation: ('Bearer ' + userToken)
               }
            })
            .then(res => {
                dispatch({type:POST_USERAUTH, payload: res.data});
                localStorage.setItem("userToken", JSON.stringify(res.data))
            })
            .catch( error => {
                dispatch({type:ERROR_USERAUTH, error: error})
            });
        // }

    }

}
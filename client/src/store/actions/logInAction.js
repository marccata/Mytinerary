import { REQUEST_LOGIN } from './types';
import { POST_LOGIN } from './types';
import { ERROR_LOGIN } from './types';
import axios from 'axios';

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
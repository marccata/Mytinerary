import { REQUEST_USER } from './types';
import { POST_USER } from './types';
import { ERROR_USER } from './types';
import axios from 'axios';

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
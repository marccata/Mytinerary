import { REQUEST_REGISTERUSER } from './types';
import { POST_REGISTERUSER } from './types';
import { ERROR_REGISTERUSER } from './types';
import axios from 'axios';

export function registerUser(userToken) { //TODO Como cojo el token?

    return function(dispatch){

        dispatch({type:REQUEST_REGISTERUSER})

        // //if there is a token in localstorage do this
        // if (localStorage.getItem('userToken')) {
        //     var userToken = localStorage.getItem('userToken');
        //     var userToken = JSON.parse(userToken);
        //     dispatch({type:POST_REGISTERUSER, payload: userToken});   
        // }
        // //else make axios and save the token in localstorage
        // else {
            axios.get('/api/users/auth/', {
               headers:{
                Authorisation: ('Bearer ' + userToken)
               }
            })
            .then(res => {
                dispatch({type:POST_REGISTERUSER, payload: res.data});
                localStorage.setItem("userToken", JSON.stringify(res.data))
            })
            .catch( error => {
                dispatch({type:ERROR_REGISTERUSER, error: error})
            });
        // }

    }

}
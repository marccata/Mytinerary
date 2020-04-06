import axios from 'axios';

import { REQUEST_NEWUSER, POST_NEWUSER, ERROR_NEWUSER } from './types';
import { REQUEST_LOGIN, POST_LOGIN, ERROR_LOGIN } from './types';
import { REQUEST_USERAUTH, POST_USERAUTH, ERROR_USERAUTH } from './types';
import { REQUEST_LOGOUT, EXECUTE_LOGOUT, ERROR_LOGOUT } from './types';
import { ERROR_FAV_ITINERARY, EXECUTE_FAV_ITINERARY, REQUEST_FAV_ITINERARY } from './types';

// TODO this reducer/action can be improved so at sign up you're already logged in also
export function postUser(userEmail, userPassword, userUser_img, userName) {
    return function(dispatch){

        dispatch({type:REQUEST_NEWUSER})

        axios.post('/api/users/', {
            email: userEmail,
            password: userPassword,
            user_img: userUser_img,
            name: userName
        })
        
        .then(res => {
            dispatch({type:POST_NEWUSER, payload: res.data});
            console.log('POST USER WORKED');
            console.log(res.data);
            dispatch(logInUser(userEmail, userPassword));
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
            console.log(res.data);
            console.log(res.data.token);
            //Saves token to localstorage. If it already exists is gets silently overwritten.
            localStorage.setItem("userToken",res.data.token);
            //Calls the user authentication so this same action sets the authenticated state as true
            dispatch(authenticateUser(res.data.token))
        })
        .catch( error => {
            dispatch({type:ERROR_LOGIN, error: error})
        });

    }
}

export function authenticateUser(userToken) {
    return function(dispatch){

        console.log(userToken)
        dispatch({type:REQUEST_USERAUTH})

        axios.get('/api/users/auth/', {
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then(res => {
            dispatch({type:POST_USERAUTH, payload: res.data});
            //localStorage.setItem("userInfo", JSON.stringify(res.data)) //TODO Not sure if this is needed
            console.log(res.data.email + ' IS LOGGED IN');
        })
        .catch( error => {
            dispatch({type:ERROR_USERAUTH, error: error})
        });

    }

}

export const logOutUser = () => (dispatch) => {
    dispatch({type:REQUEST_LOGOUT})
    console.log('log out user action called')
    try {
        dispatch({type:EXECUTE_LOGOUT, payload: 'prueba'});
        console.log('Local storage is empty now and user logged out');
        //Empty local storage
        localStorage.clear();
    }
    catch (error) {
    dispatch({type:ERROR_LOGOUT, error: error})
    } 
}

export function favItinerary(itineraryId) {
    return function(dispatch){

        console.log(itineraryId) // THIS IS OK
        console.log(localStorage.getItem('userToken'))
        dispatch({type:REQUEST_FAV_ITINERARY})

        axios.put('/api/users/fav-itinerary/' + itineraryId, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('userToken') // TODO sería mejor pasarle el token pero con esto debería funcionar
            }
        })
        
        .then(res => {
            dispatch({type:EXECUTE_FAV_ITINERARY, payload: res.data});
            console.log('FAV ITINERARY ADD/REMOVE WORKED');
        })

        .catch( error => {
            dispatch({type:ERROR_FAV_ITINERARY, error: error})
        });

    }
}
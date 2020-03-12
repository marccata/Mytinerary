import { REQUEST_CITIES } from '../actions/types';
import { GET_CITIES } from '../actions/types';
import { ERROR_CITIES } from '../actions/types';
import axios from 'axios';

export function getCities() {
    return function(dispatch){
        dispatch({type:REQUEST_CITIES})
        fetch(`./api/cities/all`)
        .then(response => response.json())
        .then(data => {
            console.log("ACTION GET CITIES EXECUTED");
            dispatch({type:GET_CITIES, payload: data})
        })
        .catch( error => {
            dispatch({type:ERROR_CITIES, error: error})
        });
    }
}
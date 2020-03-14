import { REQUEST_CITIES } from './types';
import { GET_CITIES } from './types';
import { ERROR_CITIES } from './types';
import axios from 'axios';

export function getCities() {
    return function(dispatch){
        dispatch({type:REQUEST_CITIES})
        axios.get(`/api/cities/all`)
        .then(res => {
            dispatch({type:GET_CITIES, payload: res.data})
        })
        .catch( error => {
            dispatch({type:ERROR_CITIES, error: error})
        });
    }
}
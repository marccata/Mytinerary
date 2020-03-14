import { REQUEST_ITINERARIES } from './types';
import { GET_ITINERARIES } from './types';
import { ERROR_ITINERARIES } from './types';
import axios from 'axios';

export function getItineraries(cityId) {
    return function(dispatch){
        dispatch({type:REQUEST_ITINERARIES})
        axios.get(`/api/itineraries/bycity/` + cityId)
        .then(res => {
            dispatch({type:GET_ITINERARIES, payload: res.data});
            console.log('FETCH ITINERARIES WORKED');
            console.log(res.data);
        })
        .catch( error => {
            dispatch({type:ERROR_ITINERARIES, error: error})
        });
    }
}
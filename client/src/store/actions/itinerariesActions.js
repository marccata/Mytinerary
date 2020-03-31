import axios from 'axios';

import { REQUEST_ITINERARIES } from './types';
import { GET_ITINERARIES } from './types';
import { ERROR_ITINERARIES } from './types';

import { REQUEST_ITINERARIES_COMMENTS } from './types';
import { GET_ITINERARIES_COMMENTS } from './types';
import { ERROR_ITINERARIES_COMMENTS } from './types';

export function getItineraries(cityId) {
    return function(dispatch){
        dispatch({type:REQUEST_ITINERARIES})
        axios.get(`/api/itineraries/bycity/` + cityId)
        .then(res => {
            dispatch({type:GET_ITINERARIES, payload: res.data});
            console.log('FETCH ITINERARIES WORKED');
        })
        .catch( error => {
            dispatch({type:ERROR_ITINERARIES, error: error})
        });
    }
}

export function getItinerariesComments(itineraryId) {
    return function(dispatch){
        dispatch({type:REQUEST_ITINERARIES_COMMENTS})
        axios.get(`/api/itinerariescomments/byitinerary/` + itineraryId)
        .then(res => {
            dispatch({type:GET_ITINERARIES_COMMENTS, payload: res.data});
            console.log('GET ITINERARIES COMMENTS WORKED');
            console.log(res.data);
        })
        .catch( error => {
            dispatch({type:ERROR_ITINERARIES_COMMENTS, error: error})
        });
    }
}
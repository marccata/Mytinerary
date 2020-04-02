import axios from 'axios';
import { REQUEST_ITINERARIES, GET_ITINERARIES, ERROR_ITINERARIES } from './types';
import { REQUEST_ITINERARIES_COMMENTS, GET_ITINERARIES_COMMENTS, ERROR_ITINERARIES_COMMENTS } from './types';
import { REQUEST_NEWCOMMENT, POST_NEWCOMMENT, ERROR_NEWCOMMENT } from './types';

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

export function postItineraryComment(itineraryId, userId, commentText, commentTime) {
    return function(dispatch){

        dispatch({type:REQUEST_NEWCOMMENT})

        axios.post('/api/itinerariescomments/', {
            itinerary_id: itineraryId,
            user_id: userId,
            comment: commentText,
            time: commentTime
        })
        
        .then(res => {
            //dispatch({type:POST_NEWCOMMENT, payload: {itineraryId, userId, commentText, commentTime}});
            dispatch(getItinerariesComments(itineraryId))
            console.log('NEW COMMENT POSTED SUCCESSFULLY');
            console.log(res.data);
        })

        .catch( error => {
            dispatch({type:ERROR_NEWCOMMENT, error: error})
        });

    }
}
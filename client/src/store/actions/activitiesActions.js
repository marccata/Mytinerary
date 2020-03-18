import { REQUEST_ACTIVITIES } from './types';
import { GET_ACTIVITIES } from './types';
import { ERROR_ACTIVITIES } from './types';
import axios from 'axios';

export function getActivities(itineraryId) {
    return function(dispatch){
        dispatch({type:REQUEST_ACTIVITIES})
        axios.get(`/api/activities/byitinerary/` + itineraryId)
        .then(res => {
            dispatch({type:GET_ACTIVITIES, payload: res.data});
            console.log('FETCH ACTIVITIES WORKED');
            console.log(res.data);
        })
        .catch( error => {
            dispatch({type:ERROR_ACTIVITIES, error: error})
        });
    }
}
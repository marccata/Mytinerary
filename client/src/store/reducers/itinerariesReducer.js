import { REQUEST_ITINERARIES } from '../actions/types';
import { GET_ITINERARIES } from '../actions/types';
import { ERROR_ITINERARIES } from '../actions/types';

import { REQUEST_ITINERARIES_COMMENTS } from '../actions/types';
import { GET_ITINERARIES_COMMENTS } from '../actions/types';
import { ERROR_ITINERARIES_COMMENTS } from '../actions/types';


const initState = {
    itineraries:[],
    isLoading: false,
    error: null
};

export default function itinerariessReducer(state = initState, action) {
    switch (action.type) {

        // GET ITINERARIES
        case REQUEST_ITINERARIES:
            return {
                ...state,
                isLoading: true
            };
        case GET_ITINERARIES:
            console.log(action.payload);
            return {
                ...state,
                error: null,
                itineraries: action.payload,
                isLoading: false
            };
        case ERROR_ITINERARIES:
            console.log("AXIOS CATCH: ERROR LOADING DATA", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };

        // GET ITINERARIES COMMENTS
        case REQUEST_ITINERARIES_COMMENTS:
            return {
                ...state,
                isLoading: true
            };
        case GET_ITINERARIES_COMMENTS:
            console.log(action.payload);
            return {
                ...state,
                error: null,
                itinerariesComments: action.payload,
                isLoading: false
            };
        case ERROR_ITINERARIES_COMMENTS:
            console.log("AXIOS CATCH: ERROR LOADING ITINERARIES COMMENTS", action);
            return {
                ...state,
                error: action.error.message,
                isLoading: false,
            };

        default:
            return state 
    }
}
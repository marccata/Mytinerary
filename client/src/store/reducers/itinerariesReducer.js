import { REQUEST_ITINERARIES } from '../actions/types';
import { GET_ITINERARIES } from '../actions/types';
import { ERROR_ITINERARIES } from '../actions/types';


const initState = {
    itineraries:[],
    isLoading: false,
    error: null
};

export default function citiesReducer(state = initState, action) {
    switch (action.type) {
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
        default:
            return state 
    }
}
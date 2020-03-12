import { REQUEST_CITIES } from '../actions/types';
import { GET_CITIES } from '../actions/types';
import { ERROR_CITIES } from '../actions/types';


const initState = {
    cities:[],
    isLoading: false,
    // TODO WTF IS LOADING DOES?
    error: null
};

export default function citiesReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_CITIES:
            return {
                ...state,
                isLoading: true
            };
        case GET_CITIES:
            return {
                ...state,
                error: null,
                cities: action.payload,
                isLoading: false
            };
        case ERROR_CITIES:
            console.log("FETCH CATCH: ERROR LOADING DATA", action);

            return {
                ...state,
                error: action.error.message,
                isLoading: false,
                // TODO COM PUC ESCRIURE UN CONSOLE LOG AQUI?
            };
        // TODO RESEARCH SEARCH DATA IS NEEDED?
        default:
            return state 
    }
}
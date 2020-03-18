import { REQUEST_ACTIVITIES } from '../actions/types';
import { GET_ACTIVITIES } from '../actions/types';
import { ERROR_ACTIVITIES } from '../actions/types';


const initState = {
    activities:[],
    isLoading: false,
    error: null
};

export default function activitiesReducer(state = initState, action) {
    switch (action.type) {
        case REQUEST_ACTIVITIES:
            return {
                ...state,
                isLoading: true
            };
        case GET_ACTIVITIES:
            console.log(action.payload);
            return {
                ...state,
                error: null,
                activities: action.payload,
                isLoading: false
            };
        case ERROR_ACTIVITIES:
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
import { GET_CITIES } from '../actions/types';

const initState = {
    cities:[]
};

export default function citiesReducer(state = initState, action) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload
            };
            default:
                return state
            // return Object.assign({}, state, {
            //     cities: action.payload
            // })
            //TODO MÉS CASOS
    }
}
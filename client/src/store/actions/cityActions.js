import { GET_CITIES } from '../actions/types';

export function getCities() {
    return function(dispatch){
        fetch(`./api/cities/all`)
        .then(response => response.json())
        .then(data => {
            console.log("then from fetch")
            dispatch({type:GET_CITIES, payload: data})
        })
        .catch(console.log('Failed on fetching cities'));
    }
}
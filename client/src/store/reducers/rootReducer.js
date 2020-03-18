import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";

const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    activities: activitiesReducer
});

export default rootReducer;

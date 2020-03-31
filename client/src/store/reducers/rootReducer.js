import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    activities: activitiesReducer,
    users: usersReducer,
});

export default rootReducer;

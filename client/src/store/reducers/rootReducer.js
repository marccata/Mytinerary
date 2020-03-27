import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import activitiesReducer from "./activitiesReducer";
import logInReducer from "./usersReducer";
import userAuthReducer from "./usersReducer";

const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    activities: activitiesReducer,
    auth: userAuthReducer,
    logIn: logInReducer
});

export default rootReducer;

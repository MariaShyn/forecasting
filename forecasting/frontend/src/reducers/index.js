import { combineReducers } from 'redux';
import countries from "./countries";
import metrics from "./metrics";
import armaValues from "./armaValues";



const forecastApp = combineReducers({
    countries,
    metrics,
    armaValues
})

export default forecastApp;
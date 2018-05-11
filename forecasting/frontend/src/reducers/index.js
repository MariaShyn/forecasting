import { combineReducers } from 'redux';
import countries from "./countries";
import metrics from "./metrics";
import armaValues from "./armaValues";
import forecast from './forecast';



const forecastApp = combineReducers({
    countries,
    metrics,
    armaValues,
    forecast
});

export default forecastApp;
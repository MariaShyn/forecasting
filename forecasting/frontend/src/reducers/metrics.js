import {
    METRICS_ACTION_CONSTANTS
} from '../actions/metrics'

const initialState = {
    metrics: [],
    valuesForMetrics: {}
};


export default function countries(state=initialState, action) {
    switch (action.type) {
        case METRICS_ACTION_CONSTANTS.FETCH_METRICS:
            return {...state, metrics: action.metrics};
        case METRICS_ACTION_CONSTANTS.FETCH_VALUES_FOR_METRICS:
            return {...state, valuesForMetrics: action.values};
        default:
            return state;
    }
}
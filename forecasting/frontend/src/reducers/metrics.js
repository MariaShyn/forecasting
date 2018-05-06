import {
    FETCH_METRICS,
    FETCH_VALUES_FOR_METRICS
} from '../actions/metrics'

const initialState = {
    metrics: [],
    valuesForMetrics: {}
};


export default function countries(state=initialState, action) {
    switch (action.type) {
        case FETCH_METRICS:
            return {...state, metrics: action.metrics};
        case FETCH_VALUES_FOR_METRICS:
            return {...state, valuesForMetrics: action.values};
        default:
            return state;
    }
}
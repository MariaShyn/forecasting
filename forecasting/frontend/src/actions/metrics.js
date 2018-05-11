import axios from 'axios';
export const METRICS_ACTION_CONSTANTS = {
    REQUEST_METRICS: 'REQUEST_METRICS',
    FETCH_METRICS: 'FETCH_METRICS',
};

function requestMetrics() {
    return {
        type: METRICS_ACTION_CONSTANTS.REQUEST_METRICS
    }
}

function fetchMetrics(metrics) {
    return {
        type: METRICS_ACTION_CONSTANTS.FETCH_METRICS,
        metrics
    }
}

export function getMetrics() {
    return function (dispatch) {
        dispatch(requestMetrics());

        return axios
            .get('/api/metrics/')
            .then((response) => {
                const data = response.data;
                dispatch(fetchMetrics(data));
            })
    }
}


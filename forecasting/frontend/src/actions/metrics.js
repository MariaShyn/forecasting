import axios from 'axios';
const BASE_URL = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/';
const METRICS_TO_URL = {
    '1': 'tour_occ_mnor?precision=1&sinceTimePeriod=2012M01&unit=PC&filterNonGeo=1&accommod=BEDPL'
};

export const REQUEST_METRICS = 'REQUEST_METRICS';
function requestMetrics() {
    return {
        type: REQUEST_METRICS
    }
}

export const FETCH_METRICS = 'FETCH_METRICS';
function fetchMetrics(metrics) {
    return {
        type: FETCH_METRICS,
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

export const REQUEST_VALUES_FOR_METRICS = 'REQUEST_VALUES_FOR_METRICS';
function requestValuesForMetrics() {
    return {
        type: REQUEST_VALUES_FOR_METRICS
    }
}

export const FETCH_VALUES_FOR_METRICS = 'FETCH_VALUES_FOR_METRICS';
function fetchValuesForMetrics(values) {
    return {
        type: FETCH_VALUES_FOR_METRICS,
        values
    }
}

export function getValuesForMetrics(metricId) {
    return function (dispatch) {
        dispatch(requestValuesForMetrics());

        return axios
            .get(BASE_URL + METRICS_TO_URL[metricId])
            .then((response) => {
                const data = response.data;
                dispatch(fetchValuesForMetrics(data));
            })
    }
}



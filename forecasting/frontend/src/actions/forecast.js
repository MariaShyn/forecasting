import axios from 'axios';
const BASE_URL = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/';
const METRICS_TO_URL = {
    '1': {
        url: 'tour_occ_mnor?precision=1&sinceTimePeriod=2012M01&unit=PC&filterNonGeo=1&accommod=BEDPL',
        type: 'month'
    },
    '2': {
        url: 'tour_occ_arm?nace_r2=I551&precision=1&sinceTimePeriod=2012M01&unit=NR&c_resid=TOTAL',
        type: 'month'
    },
    '3': {
        url: 'tour_occ_nim?nace_r2=I551&precision=1&sinceTimePeriod=2012M01&unit=NR&c_resid=TOTAL',
        type: 'month'
    },
    '4': {
        url: 'tour_cap_nat?nace_r2=I551&precision=1&sinceTimePeriod=1990&unit=NR&accommod=BEDPL&accommod=BEDRM&accommod=ESTBL',
        type: 'year'
    },
    '5': {
        url: 'tour_occ_arnat?nace_r2=I551&precision=1&sinceTimePeriod=1990&unit=NR&c_resid=TOTAL',
        type: 'year'
    }
};

export const FORECAST_ACTION_CONSTANTS = {
    SET_CURRENT_COUNTRY: 'SET_CURRENT_COUNTRY',
    REQUEST_VALUES_FOR_FORECAST: 'REQUEST_VALUES_FOR_FORECAST',
    SAVE_ALL_DATA_FOR_FORECAST: 'SAVE_ALL_DATA_FOR_FORECAST',
    REQUEST_FORECAST: 'REQUEST_FORECAST',
    SUCCESS_FORECAST: 'SUCCESS_FORECAST',
    SET_DATA_TIME_TYPE: 'SET_DATA_TIME_TYPE'
};

function requestValuesForForecast() {
    return {
        type: FORECAST_ACTION_CONSTANTS.REQUEST_VALUES_FOR_FORECAST
    }
}

function saveDataForForecast(values) {
    return {
        type: FORECAST_ACTION_CONSTANTS.SAVE_ALL_DATA_FOR_FORECAST,
        values
    }
}

function setDataTimeType(time) {
    return {
        type: FORECAST_ACTION_CONSTANTS.SET_DATA_TIME_TYPE,
        time
    }
}


export function requestForecast() {
    return {
        type: FORECAST_ACTION_CONSTANTS.REQUEST_FORECAST
    }
}

export function successForecast(data) {
    return {
        type: FORECAST_ACTION_CONSTANTS.SUCCESS_FORECAST,
        data
    }
}

export function getValuesForForecast(metricId) {
    return function (dispatch) {
        dispatch(requestValuesForForecast());

        return axios
            .get(BASE_URL + METRICS_TO_URL[metricId].url)
            .then((response) => {
                const data = response.data;
                dispatch(setDataTimeType(METRICS_TO_URL[metricId].type));
                dispatch(saveDataForForecast(data));
            })
    }
}

export function setCurrentCountryName(country) {
    return {
        type: FORECAST_ACTION_CONSTANTS.SET_CURRENT_COUNTRY,
        country
    }
}

export function getForecast(data) {
    return (dispatch) => {
        dispatch(requestForecast());

        return axios.post('/api/getforecast/', data)
            .then((response) => {
                dispatch(successForecast(response.data));
            });
    }
}

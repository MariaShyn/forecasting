import axios from 'axios';

export const COUNTRIES_ACTION_CONSTANTS = {
    REQUEST_COUNTRIES: 'REQUEST_COUNTRIES',
    FETCH_COUNTRIES: 'FETCH_COUNTRIES',
    REQUEST_COUNTRY_BY_ID: 'REQUEST_COUNTRY_BY_ID',
    FETCH_COUNTRY_BY_ID: 'FETCH_COUNTRY_BY_ID',
};

function requestCountries() {
    return {
        type: COUNTRIES_ACTION_CONSTANTS.REQUEST_COUNTRIES
    }
}

function fetchCountries(countries) {
    return {
        type: COUNTRIES_ACTION_CONSTANTS.FETCH_COUNTRIES,
        countries
    }
}

export function getCountries() {
    return function (dispatch) {
        dispatch(requestCountries());

        return axios
            .get('/api/countries/')
            .then((response) => {
                const data = response.data;
                dispatch(fetchCountries(data));
            })
    }
}

function requestCountryById() {
    return {
        type: COUNTRIES_ACTION_CONSTANTS.REQUEST_COUNTRY_BY_ID
    }
}

function fetchCountryById(country) {
    return {
        type: COUNTRIES_ACTION_CONSTANTS.FETCH_COUNTRY_BY_ID,
        country
    }
}

export function getCountryById(id) {
    return (dispatch) => {
        dispatch(requestCountryById());

        return axios
            .get(`/api/countries/${id}/`)
            .then((response) => {
                const data = response.data;
                dispatch(fetchCountryById(data));
            })
    }
}

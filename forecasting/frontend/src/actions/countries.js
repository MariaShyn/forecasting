import axios from 'axios';

export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
function requestCountries() {
    return {
        type: REQUEST_COUNTRIES
    }
}

export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
function fetchCountries(countries) {
    return {
        type: FETCH_COUNTRIES,
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

export const REQUEST_COUNTRY_BY_ID = 'REQUEST_COUNTRY_BY_ID';
function requestCountryById() {
    return {
        type: REQUEST_COUNTRY_BY_ID
    }
}

export const FETCH_COUNTRY_BY_ID = 'FETCH_COUNTRY_BY_ID';
function fetchCountryById(country) {
    return {
        type: FETCH_COUNTRY_BY_ID,
        country
    }
}

export function getCountryById(id) {
    return function (dispatch) {
        dispatch(requestCountryById());

        return axios
            .get(`/api/countries/${id}/`)
            .then((response) => {
                const data = response.data;
                dispatch(fetchCountryById(data));
            })
    }
}
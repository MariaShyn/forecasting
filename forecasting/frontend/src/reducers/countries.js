import {
    COUNTRIES_ACTION_CONSTANTS
} from '../actions/countries'

const initialState = {
    countries: [],
    activeCountry: {},
};


export default function countries(state=initialState, action) {
    switch (action.type) {
        case COUNTRIES_ACTION_CONSTANTS.FETCH_COUNTRIES:
            return {...state, countries: action.countries};
        case COUNTRIES_ACTION_CONSTANTS.FETCH_COUNTRY_BY_ID:
            return {...state, activeCountry: action.country};
        default:
            return state;
    }
}
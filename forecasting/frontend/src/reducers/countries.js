import {
    FETCH_COUNTRIES,
    FETCH_COUNTRY_BY_ID
} from '../actions/countries'

const initialState = {
    countries: [],
    activeCountry: {},
};


export default function countries(state=initialState, action) {
    switch (action.type) {
        case FETCH_COUNTRIES:
            return {...state, countries: action.countries};
        case FETCH_COUNTRY_BY_ID:
            return {...state, activeCountry: action.country};
        default:
            return state;
    }
}
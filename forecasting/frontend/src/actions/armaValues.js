import axios from 'axios';

export const REQUEST_ARMAVALUES = 'REQUEST_ARMAVALUES';
function requestArmaValues() {
    return {
        type: REQUEST_ARMAVALUES
    }
}

export const FETCH_ARMAVALUES = 'FETCH_ARMAVALUES';
function fetchArmaValues(armaValues) {
    return {
        type: FETCH_ARMAVALUES,
        armaValues
    }
}

export function getArmaValues(countryId) {
    return function (dispatch) {
        dispatch(requestArmaValues());

        return axios
            .get(`/api/armavalues/${countryId}/`)
            .then((response) => {
                const data = response.data;
                dispatch(fetchArmaValues(data));
            })
    }
}

import axios from 'axios';

export const ARMA_VALUE_ACTION_CONSTANTS = {
    REQUEST_ARMAVALUES: 'REQUEST_ARMAVALUES',
    FETCH_ARMAVALUES: 'FETCH_ARMAVALUES',
};

function requestArmaValues() {
    return {
        type: ARMA_VALUE_ACTION_CONSTANTS.REQUEST_ARMAVALUES
    }
}

function fetchArmaValues(armaValues) {
    return {
        type: ARMA_VALUE_ACTION_CONSTANTS.FETCH_ARMAVALUES,
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

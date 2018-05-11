import {
    ARMA_VALUE_ACTION_CONSTANTS
} from '../actions/armaValues'

const initialState = {
    currentArmaValues: []
};


export default function armaValues(state=initialState, action) {
    switch (action.type) {
        case ARMA_VALUE_ACTION_CONSTANTS.FETCH_ARMAVALUES:
            return {...state, currentArmaValues: action.armaValues};
        default:
            return state;
    }
}
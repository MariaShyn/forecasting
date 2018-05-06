import {
    FETCH_ARMAVALUES
} from '../actions/armaValues'

const initialState = {
    currentArmaValues: []
};


export default function armaValues(state=initialState, action) {
    switch (action.type) {
        case FETCH_ARMAVALUES:
            return {...state, currentArmaValues: action.armaValues};
        default:
            return state;
    }
}
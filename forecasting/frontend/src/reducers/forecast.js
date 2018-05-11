import {
    FORECAST_ACTION_CONSTANTS
} from '../actions/forecast'

const initialState = {
    currentCountryName: '',
    countryLabel: '',
    metricLabel: '',
    allForecastValues: {},
    labels: [],
    firstDataset: [],
    secondDataset: [],
    thirdDataset: [],
    valuesForMetrics: {},
    timeLabels: [],
    indexOfCountry: 0,
    dataSource: '',
    dataTimeType: ''
};


function getLabelOfCountry(state, data) {
    const labelObj = data.dimension.geo.category.label;
    if (state.currentCountryName === 'Germany') return 'DE';
    if (state.currentCountryName === 'Macedonia') return 'MK';
    for(let key in labelObj) {
        if(labelObj[key] === state.currentCountryName && labelObj.hasOwnProperty(key)) {
            return key;
        }
    }
}

function getIndexOfCountry(state, data) {
    return data.dimension.geo.category.index[getLabelOfCountry(state, data)];
}

function getFirstDataset(state, data) {
    const multiplier = state.dataTimeType === 'month' ? 84 : 28;

    const startIndex = getIndexOfCountry(state, data) * multiplier;
    const stopIndex = startIndex + multiplier;
    const returnedArray = [];
    for (let i = startIndex;i < stopIndex; i++) {
        if (data.value[i]) returnedArray.push(data.value[i]);
        else returnedArray.push(null);
    }
    while(!returnedArray[returnedArray.length - 1]) {
        returnedArray.length --;
    }
    return returnedArray;
}

function initializeSecondDataset(state, data) {
    const firstDatasetLength = state.firstDataset.length;
    let returnedArray = [];
    for(let i = 0; i < data.data.length; i++) {
        returnedArray[i + firstDatasetLength] = data.data[i];
    }
    returnedArray[firstDatasetLength - 1] = state.firstDataset[state.firstDataset.length - 1];
    return returnedArray;
}

export default function countries(state=initialState, action) {
    switch (action.type) {
        case FORECAST_ACTION_CONSTANTS.SET_CURRENT_COUNTRY:
            return {...state, currentCountryName: action.country};
        case FORECAST_ACTION_CONSTANTS.SAVE_ALL_DATA_FOR_FORECAST:
            const values = action.values;
            const firstDataset = getFirstDataset(state, values);
            let returnedTimeLabels = Object.keys(values.dimension.time.category.label);
            if (Object.keys(values.dimension.time.category.label).length > firstDataset.length) {
                returnedTimeLabels = returnedTimeLabels.slice(0, firstDataset.length);
            }
            return {
                ...state,
                timeLabels: returnedTimeLabels,
                valuesForMetrics: values,
                firstDataset: firstDataset,
                secondDataset: [],
                countryLabel: getLabelOfCountry(state, values),
                metricLabel: values.label,
                dataSource: values.source,
            };
        case FORECAST_ACTION_CONSTANTS.SUCCESS_FORECAST:
            return {
                ...state,
                secondDataset: initializeSecondDataset(state, action.data),
                timeLabels: state.timeLabels.slice(0, state.firstDataset.length).concat(action.data.dates)
            };
        case FORECAST_ACTION_CONSTANTS.SET_DATA_TIME_TYPE:
            return {
                ...state,
                dataTimeType: action.time
            };
        default:
            return state;
    }
}
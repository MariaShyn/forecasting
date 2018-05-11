import React, { Component } from 'react';
import { connect } from "react-redux";

import TopNavbar from '../../components/TopNavbar/TopNavbar';
import { setCurrentCountryName, getValuesForForecast, getForecast } from "../../actions/forecast";
import { getCountryById } from "../../actions/countries";

import './CountryForecast.css';

import { Line } from 'react-chartjs-2';

class CountryForecast extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeGap: 1
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const countryId = params.countryId;
        const metricId = params.metricId;

        this.props.getValuesForForecast(metricId);
        this.props.getCountryById(countryId);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.activeCountry.name) {
            this.props.setCurrentCountryName(nextProps.activeCountry.name);
        }
    }

    handleForecastValueOnChange = (e) => {
         this.setState({timeGap: +e.target.value})
    };

    getForecast = () => {
        const { firstDataset, timeLabels, getForecast, dataTimeType, match: { params } } = this.props;
        const { countryId, metricId } = params;
        const { timeGap } = this.state;
        if(firstDataset && timeLabels) {
            getForecast({
                countryId: +countryId,
                metricId: +metricId,
                dates: timeLabels.slice(0, firstDataset.length),
                values: firstDataset,
                dataTimeType,
                timeGap
            });
        }
    };

    countAverage = () => {
        const { firstDataset } = this.props;
        if (firstDataset.length > 0 && firstDataset.length < 300) {
            const sum = firstDataset.reduce((acc, val) => { return acc + val; });
            return sum / firstDataset.length;
        }
        return 0;
    };

    countNotNull = () => {
        const { firstDataset } = this.props;
        let count = 0;
        let i = firstDataset.length;
        while (i--) {
            if (!firstDataset[i]) {
                count++;
            }
        }
        return firstDataset.length - count;
    };

    render() {
        const { activeCountry, timeLabels, firstDataset, secondDataset, countryLabel, metricLabel, dataSource, dataTimeType } = this.props;
        const { timeGap } = this.state;
        const data = {
            labels: timeLabels.slice(0, firstDataset.length + secondDataset.length),
            datasets: [
                {
                    label: 'Observed',
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(151,187,205,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(151,187,205,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(151,187,205,1)',
                    pointHoverBorderColor: 'rgba(151,187,205,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    data: firstDataset
                },

                {
                    label: 'Forecast',
                    fill: false,
                    backgroundColor: 'rgba(255,150,111,0.4)',
                    borderColor: 'rgba(255,150,111,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255,150,111,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255,150,111,1)',
                    pointHoverBorderColor: 'rgba(255,150,111,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 4,
                    data: secondDataset,
                }
            ]
        };
        return (<div className="country-forecast">
            <TopNavbar />
            <div className="metrics-info">
                <div className="chart-wrapper">
                    {
                        firstDataset.length &&
                        <Line
                            data={data}
                            height={600}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    }
                </div>
                <div className="metrics-info__text">
                    <div className="metrics-info__header shadow-text">
                        { metricLabel }
                    </div>
                    {
                        firstDataset.length && (this.countNotNull() < 50 && dataTimeType === 'month' )&&
                        <div className="metrics-info__warning">! Possible inaccuracy of the forecast due to insufficient data </div>
                    }
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td>
                                    <p>Country: <span className="shadow-text">{ activeCountry.name }</span></p>
                                    <p>Source: { dataSource }</p>
                                    <p>Label: { countryLabel }</p>
                                    <p>Average value: { this.countAverage() }</p>
                                </td>
                                <td>
                                    <div className="get-forecast-input-wrapper">
                                        for
                                        <input
                                            type='number'
                                            className="get-forecast-input"
                                            min='1'
                                            max={dataTimeType === 'month' ? '99' : '5'}
                                            value={timeGap}
                                            onChange={(e) => this.handleForecastValueOnChange(e)}
                                        />
                                        {dataTimeType}(s)
                                    </div>
                                    <button
                                        type="button"
                                        className="get-forecast-button"
                                        onClick={this.getForecast}
                                    >
                                        Get forecast
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = store => {
    return {
        valuesForMetrics: store.forecast.valuesForMetrics,
        activeCountry: store.countries.activeCountry,
        timeLabels: store.forecast.timeLabels,
        firstDataset: store.forecast.firstDataset,
        secondDataset: store.forecast.secondDataset,
        countryLabel: store.forecast.countryLabel,
        metricLabel: store.forecast.metricLabel,
        dataSource: store.forecast.dataSource,
        dataTimeType: store.forecast.dataTimeType,
        dataDimension: store.forecast.dataDimension
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getValuesForForecast: (id) => dispatch(getValuesForForecast(id)),
        getCountryById: (id) => dispatch(getCountryById(id)),
        getForecast: (data) => dispatch(getForecast(data)),
        setCurrentCountryName: (name) => dispatch(setCurrentCountryName(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryForecast);

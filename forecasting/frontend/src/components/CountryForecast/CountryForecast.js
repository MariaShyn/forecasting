import React, { Component } from 'react';
import TopNavbar from '../TopNavbar/TopNavbar';

import './CountryForecast.css';
import { getValuesForMetrics } from "../../actions/metrics";
import { getCountryById } from "../../actions/countries";
import { connect } from "react-redux";

const LineChart = require("react-chartjs").Line;

class CountryForecast extends Component {
    constructor(props) {
        super(props);

        this.data = {
            labels: new Array(74),
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(230,230,230,0.2)",
                    strokeColor: "rgba(230,230,230,1)",
                    pointColor: "rgba(230,230,230,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(230,230,230,1)",
                    data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
    }

    getLabelOfCountry = () => {
        if(this.props.valuesForMetrics.dimension && this.props.activeCountry) {
            const labelObj = this.props.valuesForMetrics.dimension.geo.category.label;
            if (this.props.activeCountry.name === 'Germany') return 'DE';
            for(let key in labelObj) {
                if(labelObj[key] === this.props.activeCountry.name && labelObj.hasOwnProperty(key)) {
                    return key;
                }
            }
        }
    };

    getIndexOfCountry = () => {
        if(this.props.valuesForMetrics.dimension) {
            return this.props.valuesForMetrics.dimension.geo.category.index[this.getLabelOfCountry()];
        }
    };

    getAllValues = () => {
        const returnedArray = [];
        if(this.props.valuesForMetrics.value) {
            const startIndex = this.getIndexOfCountry() * 84;
            const stopIndex = startIndex + 84;
            for(let i = startIndex; i < stopIndex; i++) {
                returnedArray.push(this.props.valuesForMetrics.value[i]);
            }
        }
        return returnedArray;
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        const countryId = params.countryId;
        const metricsId = params.metricId;

        this.props.getValuesForMetrics(metricsId);
        this.props.getCountryById(countryId);
    }

    render() {
        const { valuesForMetrics, activeCountry } = this.props;
        const data = {
            labels: (this.props.valuesForMetrics.dimension ? Object.keys(this.props.valuesForMetrics.dimension.time.category.label).slice(0, 74) : new Array(74)),
            datasets: [
                {
                    label: valuesForMetrics.label,
                    fillColor: "rgba(230,230,230,0.2)",
                    strokeColor: "rgba(230,230,230,1)",
                    pointColor: "rgba(230,230,230,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(230,230,230,1)",
                    data: this.getAllValues()
                }
            ]
        };
        return (<div className="country-forecast">
            <TopNavbar />
            <div className="metrics-info">
                <div className="chart-wrapper">
                    {
                        valuesForMetrics && valuesForMetrics.dimension &&
                        valuesForMetrics.value &&
                        <LineChart
                            data={data}
                            width="1500"
                            height="500"
                            style={{ maxHeight: '550px' }}
                            options={{
                                tooltips: {
                                    mode: 'average'
                                },
                                tooltipTemplate: "<%=value%>"
                            }}
                        />
                    }
                </div>
                <div className="metrics-info__text">
                    <div className="metrics-info__header">
                        { valuesForMetrics.label }
                    </div>
                    <p>Source: { valuesForMetrics.source }</p>
                    <p>Country: { activeCountry.name }</p>
                    <p>Label: { this.getLabelOfCountry() }</p>
                    <p>Dimension: { valuesForMetrics.dimension && valuesForMetrics.dimension.unit.category.label.PC }</p>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = store => {
    return {
        valuesForMetrics: store.metrics.valuesForMetrics,
        activeCountry: store.countries.activeCountry
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getValuesForMetrics: (id) => dispatch(getValuesForMetrics(id)),
        getCountryById: (id) => dispatch(getCountryById(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryForecast);

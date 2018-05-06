import React, { Component } from 'react';
import TopNavbar from '../TopNavbar/TopNavbar';
import GoogleMap from '../GoogleMap/GoogleMap';
import { Link } from 'react-router-dom';

import './CountryInfo.css';

import {connect} from "react-redux";
import { getMetrics } from "../../actions/metrics";
import { getCountryById } from "../../actions/countries";
import { getArmaValues } from "../../actions/armaValues";

class CountryInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: {},

        }
    }

    static getObjectFromArray(arr, field, value) {
        const tmpArr = arr.filter((obj) => {
            return obj[field] === value;
        });
        return tmpArr[0];

    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const countryId = params.countryId;

        this.props.getMetrics();
        this.props.getCountryById(countryId);
        this.props.getArmaValues(countryId);
    }

    renderShortInfo = () => {
        const { activeCountry } = this.props;
        const renderedInfo = [];
        const notRenderedKeys = ['id', 'ext', 'coords', 'coords_marker'];
        for (let k in activeCountry){
            if (activeCountry.hasOwnProperty(k) && !~notRenderedKeys.indexOf(k)) {
                renderedInfo.push(
                    <div className="info-item">
                        <b className="info-item__header">{k}: </b> { activeCountry[k] }
                    </div>
                )
            }
        }
        return (<div className="short-info__text">
            {renderedInfo}
        </div>);
    };

    renderAvailableMetrics = () => {
        const { currentArmaValues, metrics, activeCountry } = this.props;
        if (!currentArmaValues) return;
        return currentArmaValues.map((item) => {
            const armaValue = CountryInfo.getObjectFromArray(metrics, 'id', item.metrics);
            return (<Link to={`/forecast/${activeCountry.id}/${item.metrics}`} style={{color: "black", textDecoration: "none"}}>
                <div className="metrics-item">
                    {armaValue.name}
                </div>
            </Link>);
            }
        );
    };

    render() {
        const { coords, coords_marker    } = this.props.activeCountry;
        return (
            <div className="country-info">
                <TopNavbar />
                <div className="short-info">
                    {
                        coords &&
                        <div className="short-info__map">
                            <GoogleMap
                                isMarkerShown={false}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4QT8EX1xHEB-b7GrC_uiurp6zx4S_y8Q&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                coords={coords.split(', ')}
                                coords_marker={coords_marker.split(', ')}
                            />
                        </div>
                    }
                    {
                        this.renderShortInfo()
                    }
                </div>
                <div className="metrics">
                    { this.renderAvailableMetrics()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        metrics: store.metrics.metrics,
        activeCountry: store.countries.activeCountry,
        currentArmaValues: store.armaValues.currentArmaValues
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMetrics: () => dispatch(getMetrics()),
        getCountryById: (id) => dispatch(getCountryById(id)),
        getArmaValues: (id) => dispatch(getArmaValues(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryInfo);

import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './CountryWrapper.css'

export default class CountryWrapper extends Component {

    render() {
        return (
            <Link to={`/country/${this.props.countryId}/`} className="country-wrapper">
                <img
                    src={("/static/countries/" + this.props.countryName + "." + (this.props.imgExt ? this.props.imgExt : "svg")).toLowerCase()}
                    className="country-wrapper__img
                "
                    alt={this.props.countryName}
                />
                <p className="country-wrapper__label">{this.props.countryName}</p>
            </Link>
        );
    }
}
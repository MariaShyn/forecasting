import React, { Component } from 'react';
import {connect} from 'react-redux';
import CountryWrapper from '../CountryWrapper/CountryWrapper';

import { getCountries } from "../../actions/countries";

import './CountryList.css';

class CountryList extends Component {
    componentDidMount() {
        this.props.getCountries();
    }

    render() {
        return (<div className="country-list" id="countryList">
            {
                this.props.countries &&
                this.props.countries.map((item) =>
                    <CountryWrapper
                        key={item.id}
                        countryId={item.id}
                        countryName={item.name}
                        imgExt={item.ext}
                    />
                )
            }
        </div>);
    }
}

const mapStateToProps = store => {
    return {
        countries: store.countries.countries,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCountries: () => dispatch(getCountries()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
import React, { Component } from 'react';

import './Header.css';

export default class Header extends Component {

    render() {
        return (<div className="header" >
            <div className="header__overlay" />
            <div className="header__content" >
                <h1 className="header__motto" >Get your own forecast</h1>
                <p className="header__mission" >Our mission is to make the most accurate <br />predictions about the <b>European</b> market</p>
                <a href="#countryList"
                    type="button"
                    className="header__button"
                >
                    Get started
                </a>
            </div>
        </div>);
    }
}
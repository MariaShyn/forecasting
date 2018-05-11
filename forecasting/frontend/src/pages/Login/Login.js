import React, { Component } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';

import './Login.css';

export default class Login extends Component {
    render() {
        return (<div>
            <TopNavbar />
            <form className="login-form">
                <input type="text" placeholder="Login"/><br />
                <input type="text" placeholder="Password"/><br />
                <button type="button" className="header__button">Login</button>
            </form>
        </div>);
    }
}
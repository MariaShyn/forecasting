import React, { Component } from 'react';

import Header from './Header/Header';
import TopNavbar from './TopNavbar/TopNavbar';
import CountryList from './CountryList/CountryList';

export default class Main extends Component {
  render() {
      return (<div>
          <TopNavbar />
          <Header />
          <CountryList />
      </div>);
  }
}
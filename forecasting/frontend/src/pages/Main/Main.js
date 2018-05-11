import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import CountryList from '../../components/CountryList/CountryList';

export default class Main extends Component {
  render() {
      return (<div>
          <TopNavbar />
          <Header />
          <CountryList />
      </div>);
  }
}
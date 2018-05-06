import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Main from './components/Main';
import NotFound from './components/NotFound';
import CountryInfo from './components/CountryInfo/CountryInfo';
import CountryForecast from './components/CountryForecast/CountryForecast';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import forecastApp from './reducers';

let store = createStore(
    forecastApp,
    applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/country/:countryId" component={CountryInfo} />
                    <Route path="/forecast/:countryId/:metricId" component={CountryForecast} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;

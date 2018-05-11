import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import CountryInfo from './pages/CountryInfo/CountryInfo';
import CountryForecast from './pages/CountryForecast/CountryForecast';

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import forecastApp from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
    forecastApp,
    /* preloadedState, */
    composeEnhancers(
    applyMiddleware(thunk)
));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/login" component={Login} />
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

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../store"

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';

const Routes = () => (
    <Provider store={store}>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
        </Switch>
    </Provider>
);

export default Routes;
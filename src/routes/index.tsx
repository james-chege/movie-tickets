import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../store"

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import BookingsPage from '../pages/BookingsPage/BookingsPage';
import BookingPage from "../pages/BookingPage/BookingPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRout";

const Routes = () => (
    <Provider store={store}>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <PrivateRoute path="/booking" component={BookingsPage} />
            <PrivateRoute path="/book" component={BookingPage} />
        </Switch>
    </Provider>
);

export default Routes;
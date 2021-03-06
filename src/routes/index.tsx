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
import authUser from "../utils/authUser.util";
import NavBar from "../components/Navigation/NavBar";
import MoviePage from "../pages/MoviePage/MoviePage";

const Routes = () => (
    <Provider store={store}>
        {authUser() && <NavBar/>}
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <PrivateRoute path="/booking" component={BookingsPage} />
            <PrivateRoute path="/book" component={BookingPage} />
            <PrivateRoute path="/movie/:id" exact component={MoviePage} />
        </Switch>
    </Provider>
);

export default Routes;

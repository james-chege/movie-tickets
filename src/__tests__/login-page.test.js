import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import {Route, Router } from "react-router-dom";
import LoginPage, { useCustomMutation } from "../pages/LoginPage/LoginPage";
import { renderHook, act } from '@testing-library/react-hooks';
import nock from 'nock';

const history = createMemoryHistory()

const WithRouter = ({...rest}) => (
    <Router history={history}>
        <Route {...rest} />
    </Router>
);
const data = {name: 'James', email: 'j@g.com', password: 'pass'}

afterEach(cleanup);

test('Should validate form', async () => {
    render(
        <WithRouter>
            <LoginPage data={data} />
        </WithRouter>
    )
    expect(screen.getAllByText('Login')).toHaveLength(2);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
})

test('Should submit form without errors', async () => {
    render(
        <WithRouter>
            <LoginPage data={data} />
        </WithRouter>
    )
    fireEvent.change(screen.getByPlaceholderText("example@example.com"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
        target: { value: "securePass1"}
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('login-form')).toHaveClass('loading');
})

test('should handle errors', async () => {
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .post('/api/users/login', {email: '', password: ''})
        .reply(200, {token: 'thisisatoken'});
    const {result, waitForNextUpdate} = renderHook(() => useCustomMutation());
    expect(typeof result.current.mutate).toBe('function');
    act(() => {
        result.current.mutate({email: '', password: ''})
    })
    await waitForNextUpdate();
    expect(result.current.data).toEqual({token: 'thisisatoken'});
    expect(scope.isDone()).toBe(true);
})



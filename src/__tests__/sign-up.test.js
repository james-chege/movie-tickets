import { render, screen, waitFor, fireEvent, cleanup, act as acting } from "@testing-library/react";
import React from "react";
import { createMemoryHistory } from "history";
import {Route, Router } from "react-router-dom";
import nock from 'nock';
import SignUpPage  from "../pages/SignUpPage/SignUpPage";
import mockApi from "../utils/mockApi";

const history = createMemoryHistory()

const WithRouter = ({...rest}) => (
    <Router history={history}>
        <Route {...rest} />
    </Router>
);

beforeAll(() => {
    delete window.location
    window.location = { reload: jest.fn() }
})

afterEach(cleanup);

test('Should validate form', async () => {
    render(
        <WithRouter>
            <SignUpPage />
        </WithRouter>
    )
    expect(screen.getAllByText('Sign Up')).toHaveLength(2);
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Name is required')).toBeInTheDocument();
})

test('Should submit form without errors', async () => {
    render(
        <WithRouter>
            <SignUpPage />
        </WithRouter>
    )
    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("username@email.com"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
        target: { value: "securePass1"}
    });
    fireEvent.change(screen.getByPlaceholderText("confirm password"), {
        target: { value: "securePass1"}
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByRole('heading'))
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(screen.getByTestId('sign-up-form')).toHaveClass('loading');
})

test('should handle error', async () => {
    render(
        <WithRouter>
            <SignUpPage />
        </WithRouter>
    )
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .post('/api/users/signup')
        .reply(400, 'wrong email and or password!');
    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("username@email.com"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
        target: { value: "securePass1"}
    });
    fireEvent.change(screen.getByPlaceholderText("confirm password"), {
        target: { value: "securePass1"}
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await acting(() => new Promise((r) => setTimeout(r, 400)))
    await waitFor(() => screen.getByText('Something went wrong'));
    expect(screen.getByText('Request failed with status code 400')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(scope.isDone()).toBe(true);
})

test('should signup successfully', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };
    render(
        <WithRouter>
            <SignUpPage />
        </WithRouter>
    )
    const scope = mockApi(
        'post',
        '/api/users/signup',
        {
            user: {
                token: 'thisisatoken',
                name: 'fake', email: 'fake@g.com',
                password: 'secure',
                confirmPassword: 'secure'
            }
        },
        200
    )

    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("username@email.com"), {
        target: { value: "new@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Make it secure"), {
        target: { value: "securePass1"}
    });
    fireEvent.change(screen.getByPlaceholderText("confirm password"), {
        target: { value: "securePass1"}
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => screen.getByRole('heading'));
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(window.location.reload).toHaveBeenCalled();
    window.location = location;
})

test('should be able to toggle password', async () => {
    render(
        <WithRouter>
            <SignUpPage />
        </WithRouter>
    )
    fireEvent.click(screen.getByLabelText('eye'));
    expect(screen.getByLabelText('eye')).toHaveClass('eye slash');
})

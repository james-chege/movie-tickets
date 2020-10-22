import { act as acting, cleanup, render, screen } from "@testing-library/react";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import React from "react";
import WithRouter from "../helpers/withRouter";
import nock from "nock";
import tickets from "../__mocks__/tickets";
import { queryCache } from "react-query";

afterEach(cleanup)
beforeEach(() => queryCache.clear());
test('should render without error', async () => {
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/api/tickets/getTickets')
        .reply(200, { tickets });
    render(
        <WithRouter>
            <BookingsPage/>
        </WithRouter>
    )
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(screen.getByText('Book Movie')).toBeInTheDocument();
    expect(screen.getByText('That Dare Devil is a movie released in the year 1911')).toBeInTheDocument();
    screen.debug()
    // search
})

test('should handle error', async () => {
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/api/tickets/getTickets')
        .reply(400, 'something terrible happened');
    render(
        <WithRouter>
            <BookingsPage/>
        </WithRouter>
    )
    queryCache.cancelQueries();
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(screen.getByText('Something went wrong 😔')).toBeInTheDocument();
})

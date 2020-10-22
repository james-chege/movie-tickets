import nock from "nock";
import { act as acting, render, screen } from "@testing-library/react";
import WithRouter from "../helpers/withRouter";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import { queryCache } from "react-query";
import React from "react";

test('should do shit', async () => {
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

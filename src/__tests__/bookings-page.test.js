import { act as acting, render, screen } from "@testing-library/react";
import WithRouter from "../helpers/withRouter";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import { queryCache } from "react-query";
import React from "react";
import mockApi from "../utils/mockApi";

test('should render properly', async () => {
    const scope = mockApi(
        'get',
        '/api/tickets/getTickets',
        'something terrible happened',
        400
        )

    render(
        <WithRouter>
            <BookingsPage/>
        </WithRouter>
    )
    queryCache.cancelQueries();
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(screen.getByText('Something went wrong 😔')).toBeInTheDocument();
})

import { act as acting, cleanup, fireEvent, render, screen } from "@testing-library/react";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import React from "react";
import WithRouter from "../helpers/withRouter";
import tickets from "../__mocks__/tickets";
import { queryCache } from "react-query";
import mockApi from "../utils/mockApi";
import { SERVER_ERROR } from "../utils/constants";

afterEach(cleanup)
beforeEach(() => queryCache.clear());
test('should render without error', async () => {
    const scope = mockApi(
        'get',
        '/api/tickets/getTickets',
        { tickets },
        200
        )

    render(
        <WithRouter>
            <BookingsPage/>
        </WithRouter>
    )
    await acting(() => new Promise((r) => setTimeout(r, 400)));
    expect(screen.getByText('Book Movie')).toBeInTheDocument();
    expect(screen.getByText('That Dare Devil is a movie released in the year 1911')).toBeInTheDocument();
    // test search
    expect(screen.getByText('Gotham')).toBeInTheDocument();
    const searchInput = screen.getByLabelText('search');
    fireEvent.change(searchInput, {
        target: { value: "sky"}
    });
    expect(searchInput.value).toBe('sky');
    expect(screen.queryByText('Gotham')).toBeNull();
    // if user deletes the search input
    fireEvent.change(searchInput, {
        target: { value: ""}
    });
    expect(screen.queryByText('Gotham')).toBeInTheDocument();
})

test('should handle error', async () => {
    const scope = mockApi(
        'get',
        '/api/tickets/getTickets',
        SERVER_ERROR,
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

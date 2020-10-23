import React from "react";
import { act as acting, fireEvent, render, screen } from "@testing-library/react";
import BookingPage from "../pages/BookingPage/BookingPage";
import WithRouter from "../helpers/withRouter";
import { Provider } from "react-redux";
import store from "../store";
import nock from "nock";
import tickets from "../__mocks__/search-result";

test('', async () => {
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/api/tickets/search?q=Gotham')
        .reply(200, { result : { Search: tickets } });
    render(
        <Provider store={store}>
            <WithRouter><BookingPage /></WithRouter>
        </Provider>);
    expect(screen.getByText('Book a movie')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('combobox'));
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, {
        target: { value: "Gotham"}
    });
    await acting(() => new Promise((r) => setTimeout(r, 1000)))
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('option')[0]);
    expect(screen.getByText('Skyscraper')).toBeInTheDocument();
    screen.debug()
})

import React from "react";
import WithRouter from "../helpers/withRouter";
import { act as acting, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchMovieForm from "../components/SearchMovieForm/SearchMovieForm";
import nock from "nock";
import tickets from "../__mocks__/search-result";

test('search form', async () => {
    const scope = nock('https://ticket-please.herokuapp.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true'
        })
        .get('/api/tickets/search?q=super')
        .reply(200, { result : { Search: tickets } });
    const onMovieSelect = jest.fn();
    render(<WithRouter><SearchMovieForm onMovieSelect={onMovieSelect}/></WithRouter>);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, {
        target: { value: "super"}
    });
    await acting(() => new Promise((r) => setTimeout(r, 400)))
    expect(searchInput.value).toBe('super');
    screen.debug()
})

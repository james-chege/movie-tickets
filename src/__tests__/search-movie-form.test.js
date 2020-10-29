import React from "react";
import WithRouter from "../helpers/withRouter";
import { act as acting, fireEvent, render, screen } from "@testing-library/react";
import SearchMovieForm from "../components/SearchMovieForm/SearchMovieForm";
import nock from "nock";
import tickets from "../__mocks__/search-result";
import mockApi from "../utils/mockApi";

test('search form', async () => {
    const scope = mockApi(
        'get',
        '/api/tickets/search?q=super',
        { result : { Search: tickets } },
        200
    )

    const onMovieSelect = jest.fn();
    render(<WithRouter><SearchMovieForm onMovieSelect={onMovieSelect}/></WithRouter>);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, {
        target: { value: "super"}
    });
    await acting(() => new Promise((r) => setTimeout(r, 1000)))
    expect(searchInput.value).toBe('super');
})

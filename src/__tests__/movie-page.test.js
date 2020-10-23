import React from "react";
import { render, screen } from "@testing-library/react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import WithRouter from "../helpers/withRouter";
import MoviePage from "../pages/MoviePage/MoviePage";
import tickets from "../__mocks__/tickets";

test('should render without error', () => {
    queryCache.setQueryData('tickets', {tickets});
    useParams.mockReturnValue({ id: 24 });
    render(<WithRouter><MoviePage/></WithRouter>)
    expect(jest.isMockFunction(useParams)).toBe(true);
    expect(screen.getByLabelText('movie-summary').value)
        .toBe('That Dare Devil is a movie released in the year 1911');
})

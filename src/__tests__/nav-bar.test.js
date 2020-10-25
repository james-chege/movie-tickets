import { act as acting, render, screen, fireEvent } from "@testing-library/react";
import WithRouter from "../helpers/withRouter";
import React from "react";
import NavBar from "../components/Navigation/NavBar";


test('should logout', async () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };
    render(
        <WithRouter>
            <NavBar/>
        </WithRouter>
    )
    fireEvent.click(screen.getByRole('listbox'));
    fireEvent.click(screen.getByRole('option'));
    expect(window.location.reload).toHaveBeenCalled();
    window.location = location;
})

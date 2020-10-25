import React from "react";
import {
  act as acting,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import BookingPage from "../pages/BookingPage/BookingPage";
import WithRouter from "../helpers/withRouter";
import { Provider } from "react-redux";
import store from "../store";
import nock from "nock";
import tickets from "../__mocks__/search-result";


const BookingPageComponent = () => (
    <Provider store={store}>
      <WithRouter>
        <BookingPage />
      </WithRouter>
    </Provider>
)

test("", async () => {
  const scope = nock("https://ticket-please.herokuapp.com")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .get("/api/tickets/search?q=Skyscraper")
    .reply(200, { result: { Search: tickets } });
  const scope1 = nock("https://ticket-please.herokuapp.com")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
      "access-control-allow-credentials": "true",
    })
    .post("/api/tickets/create")
    .reply(200, {
      ticket: {
        id: 28,
        movie: "Gotham",
        summary:
          "That Dare Devil is a movie released in the year 1911",
        year: "1911",
        image:
            "https://m.media-amazon.com/images/M/MV5BMTU5NjQ2MTU4NV5BMl5BanBnXkFtZTgwOTYyNTAwNzM@._V1_SX300.jpg",
      },
      message: "Ticket created successfully.",
    });
  render(<BookingPageComponent />);
  expect(screen.getByText("Book a movie")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("combobox"));
  const searchInput = screen.getByRole("textbox");
  fireEvent.change(searchInput, {
    target: { value: "Skyscraper" },
  });
  await acting(() => new Promise((r) => setTimeout(r, 1000)));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole("option")[0]);
  expect(screen.getByText("Movie Title")).toBeInTheDocument();
  // create a booking
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByTestId('booking-form')).toHaveClass('ui form loading');
  await acting(() => new Promise((r) => setTimeout(r, 300)));
  expect(screen.getByTestId('booking-form')).toHaveClass('ui form')
});


test("should handle error", async () => {
  const scope = nock("https://ticket-please.herokuapp.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .post("/api/tickets/create")
      .reply(400, { message: "something bad happened"});
  const scope1 = nock("https://ticket-please.herokuapp.com")
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/api/tickets/search?q=Skyscraper")
      .reply(200, { result: { Search: tickets } });
  render(<BookingPageComponent />);
  expect(screen.getByText("Book a movie")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("combobox"));
  const searchInput = screen.getByRole("textbox");
  fireEvent.change(searchInput, {
    target: { value: "Skyscraper" },
  });
  await acting(() => new Promise((r) => setTimeout(r, 1000)));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole("option")[0]);
  expect(screen.getByText("Movie Title")).toBeInTheDocument();
  // create a booking
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByTestId('booking-form')).toHaveClass('ui form loading');
  await acting(() => new Promise((r) => setTimeout(r, 400)));
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
});

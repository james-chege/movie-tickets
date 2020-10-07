import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import _ from "lodash";
import {Card, Container, Divider, Form, Grid, Header, Icon, Image, Loader, Message,} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { useQuery } from "react-query";

import BookMovieCtA from "../../components/BookMovieCtA/BookMovieCtA";
import {gTickets} from "../../store/actions/booking";


const BookingsPage: React.FC<BookingsPageProps> = () => {

  const {
    data,
    isLoading,
    error
  }: any = useTickets();

  if (error) {
    console.log(error.message)
  }

  const [values, setValues] = useState<movieProps>({
    tickets: [],
    results: [],
    value: ""
  });

  const dispatch = useDispatch();

  useEffect(() => {
        setValues({ ...values, tickets: data?.tickets, results: data?.tickets });
  }, [data]);


  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!e.target.value) setValues({ ...values, results: values.tickets });
    // filter
    const results = filter(e.target.value);
    setValues({ ...values, value, results });
  };

  const filter = (value: string) => {
    const re = new RegExp(_.escapeRegExp(value), "i");
    const isMatch = (result: { movie: string }) => re.test(result.movie);
    return _.filter(values.tickets, isMatch);
  };

  return (
    <Container>
      <Loader active={isLoading} />
      {error && (
          <Message negative>
            <Message.Header>Something went wrong 😔</Message.Header>
          </Message>
      )}
      <BookMovieCtA />
      {values && (
        <Form>
          <Header as="h1" textAlign="center">
            Here are All your Bookings
          </Header>
          <Form.Field>
            <Form.Input
              icon={<Icon name={"search"} />}
              type={"text"}
              id="search"
              name="search"
              value={values.value}
              onChange={handleSearchChange}
            />
          </Form.Field>
        </Form>
      )}
      <Divider />
      <Grid stackable centered columns={2} textAlign="center">
        {values.results &&
          values.results.map((ticket: BookingsPageProps["ticket"]) => (
            <Grid.Column textAlign="center" key={ticket.id}>
              <Link to={`/movie/${ticket.id}`}>
                <Card centered>
                  <Image src={ticket.image} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{ticket.movie}</Card.Header>
                    <Card.Meta>
                      <span className="date">Year: {ticket.year}</span>
                    </Card.Meta>
                    <Card.Description>{ticket.summary}</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            </Grid.Column>
          ))}
      </Grid>
    </Container>
  );
};

const useTickets = () => {
  // Queries
  return useQuery<any>("tickets", gTickets);
}

export default BookingsPage;

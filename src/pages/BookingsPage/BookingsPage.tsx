import React, {ChangeEvent, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTickets} from "../../store/actions/booking";
import _ from "lodash"
import {
    Image,
    Card,
    Header,
    Container,
    Grid,
    Loader,
    Form, Divider, Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import BookMovieCtA from "../../components/BookMovieCtA/BookMovieCtA";
import {selectMovie} from "../../store/actions/searchMovie";

const BookingsPage: React.FC<BookingsPageProps> = () => {

    const [values, setValues] = useState<movieProps>({tickets: [], results: [], value: ''});
    const [loading, setLoadStatus] = useState(false)

    const dispatch = useDispatch();

    const booking = useSelector(({ tickets }: BookingsPageProps) => tickets)

    useEffect(() => {
        dispatch(getTickets());
    }, [])

    useEffect(() => {
        setValues({...values, tickets: booking.tickets, results: booking.tickets})
    }, [booking])

    useEffect(() => {
        setLoadStatus(booking.loading)
    }, [values.tickets, loading])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!e.target.value) setValues({...values, results: values.tickets})
        // filter
        const results = filter(e.target.value)
        setValues({...values, value, results})
    };


    const filter = (value: string) => {
        const re = new RegExp(_.escapeRegExp(value), 'i')
        const isMatch = (result: { movie: string; }) => re.test(result.movie)
        return _.filter(values.tickets, isMatch);
    }

    const makeSelection = (ticket: object) => {
        dispatch(selectMovie(ticket));
    }

    return (
        <Container>
            <Loader active={loading} />
            <BookMovieCtA />
            {booking.tickets &&
            <Form>
                <Header as='h1' textAlign='center'>Here are All your Bookings</Header>
                <Form.Field>
                    <Form.Input
                        icon = {<Icon name={'search'} />}
                        type={"text"}
                        id="search"
                        name="search"
                        value={values.value}
                        onChange={handleSearchChange}
                    />
                </Form.Field>
            </Form>
            }
            <Divider />
            <Grid stackable centered columns={2} textAlign='center'>
                    {values.results && values.results.map((ticket: BookingsPageProps["ticket"] ) =>
                        <Grid.Column textAlign='center' key={ticket.id}>
                            <Link to='movie' onClick={() => makeSelection(ticket)}>
                                <Card centered>
                                    <Image src={ticket.image} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Header>{ticket.movie}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Year: {ticket.year}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            {ticket.summary}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Link>
                        </Grid.Column>
                    )
                    }
            </Grid>
        </Container>
    );
}
export default BookingsPage;
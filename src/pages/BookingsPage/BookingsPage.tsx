import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTickets} from "../../store/actions/booking";
import { Image, Card, Header, Container, Grid, Loader} from "semantic-ui-react";
import BookMovieCtA from "../../components/BookMovieCtA/BookMovieCtA";

const BookingsPage: React.FC<BookingsPageProps> = () => {

    const [values, setValues] = useState({tickets: []});
    const [loading, setLoadStatus] = useState(false)

    const dispatch = useDispatch();

    const booking = useSelector(({ tickets }: BookingsPageProps) => tickets)
    useEffect(() => {
        dispatch(getTickets());
    }, [])

    useEffect(() => {
        setValues({...values, tickets: booking.tickets})
        setLoadStatus(booking.loading)
    }, [booking, loading])

    useEffect(() => {
        setLoadStatus(booking.loading)
    }, [values.tickets, loading])

    console.log(values.tickets)
    console.log(loading)

    return (
        <Container>
            <Loader active={loading} />
            <BookMovieCtA />
            {booking.tickets && <Header as='h1' textAlign='center'>Here are All your Bookings</Header>}
            <Grid stackable centered columns={2} textAlign='center'>
                    {booking.tickets && booking.tickets.map((ticket: BookingsPageProps["ticket"] ) =>
                        <Grid.Column textAlign='center' key={ticket.id}>
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
                        </Grid.Column>
                    )
                    }
            </Grid>
        </Container>
    );
}
export default BookingsPage;
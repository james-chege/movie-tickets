import React, {useEffect, useRef, useState} from "react";
import {Button, Container, Form, Grid, Image, Message} from "semantic-ui-react";
import {useSelector} from "react-redux";

const BookingForm: React.FC<BookingFormProps> = ({submit, movie}) => {
    const [values, setValue] = useState({
        summary: '', movie: '',
        errors: {summary: ''}
    });

    const [loading, setLoadStatus] = useState(false);

    const booking = useSelector(({ tickets }: BookingsPageProps) => tickets);

    const onSubmit = () => {
        submit?.({...movie, Summary: values.summary});
    }

    const mounted: {current: boolean | undefined} = useRef();

    useEffect(() => {
        if (!mounted.current) {
            //componentDidMount
            mounted.current = true;
            setValue({
                ...values, summary: movie?.Title + ' is a ' + movie?.Type + ' released in the year ' + movie?.Year
            })
        }
    }, [movie, values])

    useEffect(() => {
        setLoadStatus(booking.loading)
    }, [booking, loading])

    return (
        <Container>
            <Form onSubmit={onSubmit} loading={loading}>
                {booking.errors.isError && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{booking.errors}</p>
                    </Message>
                )}
                <Grid columns={2} stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <label htmlFor="title">Movie Title</label>
                                <input
                                    disabled
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    value={movie?.Title}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label htmlFor="authors">Released</label>
                                <input
                                    disabled
                                    type="text"
                                    id="year"
                                    name="year"
                                    placeholder="year"
                                    value={movie?.Year}
                                />
                            </Form.Field>


                            <Form.Field>
                                <label htmlFor="pages">Summary</label>
                                <input
                                    disabled
                                    type="text"
                                    id="summary"
                                    name="summary"
                                    placeholder="summary"
                                    value={values.summary}
                                />
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column>
                            <Image size="small" src={movie?.Poster} />
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary>Book</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    )
}

 export default BookingForm;
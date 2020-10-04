import React from "react";
import { Container, Form, Grid, Image } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const MoviePage: React.FC<RawMovieProps> = () => {

    const { status, data, error, isFetching } = useQuery('tickets');
    const { id } = useParams();
    const movie = data?.tickets.find((movie: any) => movie.id === Number(id))

return (
    <Container>
        <Form>
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
                                value={movie?.movie}
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
                                value={movie?.year}
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
                                value={movie?.summary}
                            />
                        </Form.Field>
                    </Grid.Column>

                    <Grid.Column>
                        <Image size="small" src={movie?.image} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    </Container>)
}

export default MoviePage;

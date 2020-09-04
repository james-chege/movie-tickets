import React, {useState} from "react";
import { Segment } from "semantic-ui-react";
import SearchMovieForm from "../../components/SearchMovieForm/SearchMovieForm";
import BookingForm from "../../components/BookingForm/BookingForm";
import {useHistory} from "react-router-dom";
import {createTicket} from "../../store/actions/booking";
import {useDispatch} from "react-redux";


export const BookingPage: React.FC<BookingPageProps> = () => {

    const [values, setValues] = useState({
        movie: {Title: '', Year: '', Summary: '', Poster: ''}
    });

    const history = useHistory();
    const dispatch = useDispatch();

    const onMovieSelect = (movie: BookingPageProps['movie']) => {
        setValues({...values, movie: {...values.movie, ...movie}})
    }

    const addMovie = (movie: BookingPageProps['movie']) => {
        dispatch(createTicket(movie, () => history.push( '/booking')))
    }

    return (
        <Segment>
            <h1>Book a movie</h1>
            <SearchMovieForm onMovieSelect={onMovieSelect} />

            {values.movie.Title && (
                <BookingForm submit={addMovie} movie={values.movie} />
            )}
        </Segment>
    )
}

export default BookingPage;
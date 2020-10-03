import React, {SyntheticEvent, useEffect, useState} from "react";
import {Dropdown, DropdownOnSearchChangeData, DropdownProps, Form} from "semantic-ui-react";
import {searchMovies} from "../../store/actions/searchMovie";
import {useDispatch, useSelector} from "react-redux";
import {useTimeout} from "../../helpers/useTimeout";

const SearchMovieForm: React.FC<SearchMovieFormProps> = ({ onMovieSelect }) => {

    const [values, setValues] = useState({
        query: '', movie: {}, movies: [], loading: false
    });

    const [options, setOptions] = useState( []);

    const [loading, setLoading] = useState( false);


    const dispatch = useDispatch();

    const movies = useSelector(({ searchMovies }: SearchMovieFormProps) => searchMovies);

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         fetchMovies();
    //     }, 3000)
    //
    //     return () => clearTimeout(delayDebounceFn)
    // }, [values.query])

    const onSearchChange = (e: SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
        setValues({...values, query: data.searchQuery})
    };

    const onChange = (e: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        const selectedMovie = movies?.movies?.find((movie: any) => movie.imdbID === data.value)
        onMovieSelect(selectedMovie);
    }

    const fetchMovies = () => {
        if (!values.query) return;
        dispatch(searchMovies(values.query));
    }

    useTimeout(fetchMovies, values.query);

    useEffect(() => {
        setValues({...values, ...movies?.movies});
    }, [movies])

    useEffect(() => {
        //@ts-ignore
        setLoading(movies?.loading);
    }, [movies, loading])

    useEffect(() => {
        if (values.movies) {
            const arr: any = [];
            movies?.movies?.map((movie: any) => {
             arr.push({key: movie.imdbID, value: movie.imdbID, text: movie.Title})
            })
            setOptions(arr);
        }
    }, [movies])

    return (
        <Form>
            <Dropdown
                search
                fluid
                placeholder="Search for a movie by title"
                value={values.query}
                onSearchChange={onSearchChange}
                options={options}
                loading={loading}
                onChange={onChange}
            />
        </Form>
    )
}

export default SearchMovieForm;
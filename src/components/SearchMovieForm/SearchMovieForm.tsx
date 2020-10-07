import React, {SyntheticEvent, useEffect, useState} from "react";
import {Dropdown, DropdownOnSearchChangeData, DropdownProps, Form} from "semantic-ui-react";
import {searchMovies} from "../../store/actions/searchMovie";
import {useMutation} from "react-query";

const SearchMovieForm: React.FC<SearchMovieFormProps> = ({ onMovieSelect }) => {

    const [options, setOptions] = useState( []);
    const [mutate, {data, error, isLoading}]  = useMutation(searchMovies);

    const onSearchChange = async (e: SyntheticEvent<HTMLElement, Event>, data: DropdownOnSearchChangeData) => {
        await mutate(data.searchQuery)
    };

    const onChange = (e: SyntheticEvent<HTMLElement, Event>, content: DropdownProps) => {
        const selectedMovie = data?.find((movie: any) => movie.imdbID === content.value)
        onMovieSelect(selectedMovie);
    }

    useEffect(() => {
        const arr: any = [];
        data?.map((movie: any) => {
         arr.push({key: movie.imdbID, value: movie.imdbID, text: movie.Title})
        })
        setOptions(arr);
    }, [data])

    return (
        <Form>
            <Dropdown
                search
                fluid
                placeholder="Search for a movie by title"
                onSearchChange={onSearchChange}
                options={options}
                loading={isLoading}
                onChange={onChange}
            />
        </Form>
    )
}

export default SearchMovieForm;

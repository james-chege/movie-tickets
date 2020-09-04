interface SearchMovieFormProps {
    onMovieSelect: (data) => void,
    searchMovies?: {
        movies: Array<object>,
        errors: { isError: boolean },
        loading: boolean,
        success: boolean
    },
}
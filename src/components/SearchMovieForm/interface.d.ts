interface SearchMovieFormProps {
    onMovieSelect: (data) => void,
    searchMovies?: {
        movies: Array<object>,
        errors: { isError: boolean },
        loading: boolean,
        success: boolean,
        selectedMovie: {
            movie: string;
            summary: string;
            year: string;
            image: string
        }
    },
}
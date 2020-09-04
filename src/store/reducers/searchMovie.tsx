import {
    SEARCH_MOVIE,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_ERROR,
    SEARCH_MOVIE_ERRORS, SELECT_MOVIE,
} from "../constants"
const initialState = {
    movies: [],
    selectedMovie: {},
    errors: { isError: false },
    loading: false,
    success: false,
}
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SEARCH_MOVIE_ERRORS: {
            return { ...state, errors: {} }
        }
        case SEARCH_MOVIE: {
            return { ...state, loading: true }
        }
        case SEARCH_MOVIE_SUCCESS: {
            return {
                ...state,
                success: true,
                movies: action.payload,
                loading: false,
            }
        }
        case SEARCH_MOVIE_ERROR: {
            return {
                ...state,
                isSearching: false,
                errors: { ...state.errors, isError: true, message: action.payload },
                loading: false,
            }
        }
        case SELECT_MOVIE: {
            return {
                ...state,
                selectedMovie: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer
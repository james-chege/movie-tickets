import api from "../../utils/api.util"
import {
    SEARCH_MOVIE,
    SEARCH_MOVIE_SUCCESS,
    SEARCH_MOVIE_ERROR,
    SEARCH_MOVIE_ERRORS, SELECT_MOVIE,
} from "../constants"
import { Dispatch } from "redux";

export const startSearchingMovie = () => {
    return {
        type: SEARCH_MOVIE,
    }
}

export const searchMovieSuccess = (payload: any) => {
    return {
        type: SEARCH_MOVIE_SUCCESS,
        payload,
    }
}

export const searchMovieError = (payload: any) => {
    return {
        type: SEARCH_MOVIE_ERROR,
        payload,
    }
}

export const selectMovie = (payload: object) => {
    return {
        type: SELECT_MOVIE,
        payload,
    }
}

export const clearErrors = (dispatch: Dispatch) => dispatch({ type: SEARCH_MOVIE_ERRORS })

export const searchMovies = (query: string) => async (dispatch: Dispatch) => {
    let endpoint = `/api/tickets/search?q=${query}` // rename backend route
    dispatch(startSearchingMovie());
    try {
        const response = await api.get(endpoint)
        dispatch(searchMovieSuccess(response.data.result.Search))
    } catch (error) {
        error.response
            ? dispatch(searchMovieError(error.response.data.message || error.response.data.error))
            : dispatch(searchMovieError("Something went wrong try again"))
    }
}

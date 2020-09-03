import {
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_ERROR,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    CLEAR_AUTH_ERRORS,
} from "../constants"
const initialState = {
    user: {},
    errors: { isError: false },
    saving: false,
    success: false,
}
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CLEAR_AUTH_ERRORS: {
            return { ...state, errors: {} }
        }
        case SIGNUP_USER: {
            return { ...state, loading: true }
        }
        case SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                success: true,
                user: action.payload,
                loading: false,
            }
        }
        case SIGNUP_USER_ERROR: {
            return {
                ...state,
                isRegistering: false,
                errors: { ...state.errors, isError: true, message: action.payload },
                loading: false,
            }
        }
        case LOGIN_USER: {
            return { ...state, loading: true }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                success: true,
                user: { ...state.user, user: action.payload },
                loading: false,
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                isLogging: false,
                errors: { ...state.errors, isError: true, message: action.payload },
                loading: false,
            }
        }
        default:
            return state
    }
}

export default reducer
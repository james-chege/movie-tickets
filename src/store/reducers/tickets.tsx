import {
    GET_TICKETS,
    GET_TICKETS_SUCCESS,
    GET_TICKETS_ERROR,
    CLEAR_TICKET_ERRORS,
    CREATE_TICKET,
    CREATE_TICKET_SUCCESS,
    CREATE_TICKET_ERROR
} from "../constants"
const initialState = {
    tickets: [],
    errors: { isError: false },
    loading: false,
    success: false,
}
const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CLEAR_TICKET_ERRORS: {
            return { ...state, errors: {} }
        }
        case GET_TICKETS: {
            return { ...state, loading: true }
        }
        case GET_TICKETS_SUCCESS: {
            return {
                ...state,
                success: true,
                tickets: action.payload.tickets,
                loading: false,
            }
        }
        case GET_TICKETS_ERROR: {
            return {
                ...state,
                errors: { ...state.errors, isError: true, message: action.payload },
                loading: false,
            }
        }
        case CREATE_TICKET: {
            return {
                ...state,
                loading: true,
            }
        }
        case CREATE_TICKET_SUCCESS: {
            return {
                ...state,
                success: true,
                ticket: {...state.tickets, ...action.payload},
                loading: false,
            }
        }
        case CREATE_TICKET_ERROR: {
            return {
                ...state,
                errors: { ...state.errors, isError: true, message: action.payload },
                loading: false,
            }
        }
        default:
            return state
    }
}

export default reducer
import api from "../../utils/api.util"
import {
    GET_TICKETS,
    GET_TICKETS_ERROR,
    CLEAR_TICKET_ERRORS,
    CREATE_TICKET,
    CREATE_TICKET_SUCCESS,
    CREATE_TICKET_ERROR
} from "../constants"
import { Dispatch } from "redux";

export const startCreatingTicket = () => {
    return {
        type: CREATE_TICKET,
    }
}

export const createTicketSuccess = (payload: any) => {
    return {
        type: CREATE_TICKET_SUCCESS,
        payload,
    }
}

export const createTicketError = (payload: any) => {
    return {
        type: CREATE_TICKET_ERROR,
        payload,
    }
}


export const clearErrors = (dispatch: Dispatch) => dispatch({ type: CLEAR_TICKET_ERRORS })

export const gTickets = async () => {
    const endpoint = "/api/tickets/getTickets"
        const { data } = await api.get(endpoint)
        return data;
};

export const createTicket = (data: { Title: string, Summary: string, Year: string, Poster: string },
                             callback: { (): void; }) => async (dispatch: Dispatch) => {
    let endpoint = "/api/tickets/create"
    dispatch(startCreatingTicket());
    try {
        const response = await api.post(endpoint, {
            ...data, movie: data.Title, summary: data.Summary,
            year: data.Year, image: data.Poster
        })
        dispatch(createTicketSuccess(response.data))
        if (response) {
            callback();
        }
    } catch (error) {
        const err = error.response.data.message || error.response.data.error;
        error.response
            ? dispatch(createTicketError(err))
            : dispatch(createTicketError("Something went wrong try again"))
    }
}


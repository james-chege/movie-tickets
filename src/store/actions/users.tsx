import axios from "axios";

import api from "../../utils/api.util"
import {
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    LOGIN_USER_SUCCESS,
    SIGNUP_USER_ERROR,
    CLEAR_AUTH_ERRORS,
    LOGIN_USER,
    LOGIN_USER_ERROR,
} from "../constants"
import { Dispatch } from "redux";
import {AxiosResponse} from "axios";

export const startAuth = (authType: any) => {
    let type = authType === "signup" ? SIGNUP_USER : LOGIN_USER
    return {
        type,
    }
}

export const authSuccess = (payload: any, authType: any) => {
    let type = authType === "signup" ? SIGNUP_USER_SUCCESS : LOGIN_USER_SUCCESS
    return {
        type,
        payload,
    }
}

export const authError = (payload: any, authType: any) => {
    let type = authType === "signup" ? SIGNUP_USER_ERROR : LOGIN_USER_ERROR
    return {
        type: type,
        payload,
    }
}

export const clearErrors = (dispatch: Dispatch) => dispatch({ type: CLEAR_AUTH_ERRORS })

export const userAuth = (data: any, goTo: (path: string) => void, type = "signup") => async (dispatch: Dispatch) => {
    let endpoint = "/api/users/signup"
    if (type === "login") {
        endpoint = "/api/users/login"
    }
    dispatch(startAuth(type))
    try {
        const response = await api.post(endpoint, data)
        dispatch(authSuccess(response.data, type))
        if (response.data) {
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("token", response.data.token)
            goTo("/booking")
            window.location.reload()
        }
    } catch (error) {
        const err = error.response.data.message || error.response.data.error;
        error.response
            ? dispatch(authError(err, type))
            : dispatch(authError("Something went wrong try again", type))
    }
}

export default userAuth
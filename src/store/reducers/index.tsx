import { combineReducers } from "redux"
import users from "./users"
import tickets from "./tickets"
import searchMovies from "./searchMovie"

export default combineReducers({
    users,
    tickets,
    searchMovies
})
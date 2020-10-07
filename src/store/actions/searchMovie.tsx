import api from "../../utils/api.util"

export const searchMovies = async (query: string) => {
    const endpoint = `/api/tickets/search?q=${query}` // rename backend route
    const { data } = await api.get<any>(endpoint)
    return data.result.Search;
}

import { Route, Router } from "react-router-dom";
import React from "react";
import { createMemoryHistory } from "history";

const WithRouter = ({...rest}) => {
    const history = createMemoryHistory()
    return (
        <Router history={history}>
            <Route {...rest} />
        </Router>
    )
}
export default WithRouter;

import React, {FC} from "react";
import { Route, Redirect } from "react-router-dom";
import authUser from "../../utils/authUser.util";

const PrivateRoute: FC<PrivateRouteProp> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
           return authUser() ? (
               <Component {...props}/>
            ) : (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        }
        }
    />
);

export default PrivateRoute;
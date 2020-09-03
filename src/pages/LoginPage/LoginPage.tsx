import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"

import LoginForm from "../../components/LoginForm/LoginForm";
import auth from "../../store/actions/users";

const LoginPage: React.FC<LoginPageProps> = () => {

    const [loading, setSaveStatus] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory()
    const submit = (data: LoginPageProps['data']) => {
        dispatch(auth(data, (path: string) => history.push(path || '/'), "login"))
    }

    const user = useSelector(({ users }: LoginPageProps) => users)
    useEffect(() => {
        setSaveStatus(user.loading)
    }, [user, loading])

    return (
        <div>
            <LoginForm submit={submit} loading={loading} error={user.errors}/>
        </div>
    );
}
export default LoginPage;
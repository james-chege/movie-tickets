import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import auth from "../../store/actions/users";


const LoginPage: React.FC<SignUpPageProps> = () => {

    const [loading, setSaveStatus] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory()
    const submit = (data: SignUpPageProps['data']) => {
        dispatch(auth(data, () => history.push('/')))
    }

    const user = useSelector(({ users }: SignUpPageProps) => users)
    useEffect(() => {
        setSaveStatus(user.loading)
    }, [user, loading])

    return (
        <div>
            <SignUpForm submit={submit} loading={loading} error={user.errors}/>
        </div>
    );
}
export default LoginPage;
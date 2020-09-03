import {Button, Form, Grid, Header, Message} from "semantic-ui-react";
import React, {ChangeEvent, useState} from "react";
import {Link} from "react-router-dom";
import InlineError from "../../messages/InlineError";
import validations from "../../utils/validations";
import {clearErrors} from "../../store/actions/users";
import {useDispatch} from "react-redux";


const LoginForm: React.FC<LoginFormProps> = ({submit, loading, error}) => {

    const [values, setValues] = useState({
        data: {email: '', password: ''},
        errors: {email: '', password: ''},
        loading: false,
    });

    const dispatch = useDispatch();

    const onSubmit = () => {
        const { data } = values;
        let errors = {email: '', password: ''};
        const isPasswordValid = validations.validatePassword(data.password);
        const isEmailValid = validations.validateEmail(data.email);
        if (!isEmailValid) {
            errors.email = 'Invalid email';
            setValues({...values,  errors: {...values.errors, ...errors}});
        }
        else if (!isPasswordValid) {
            errors.password = 'Password should have a minimum of 4 characters';
            setValues({...values,  errors: {...values.errors, ...errors}});
        } else if (isEmailValid && isPasswordValid) {
        //    start saving
            submit(values.data);
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(clearErrors);
        setValues({
            ...values, data: {...values.data, [e.target.name]: e.target.value},
            errors: {...values.errors, [e.target.name]: ''}
        });
    }
    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column textAlign='left' id="signup-form" style={{maxWidth: 450}}>
                <Header as='h2'>
                    Login
                </Header>

                <Form onSubmit={onSubmit} loading={values.loading}>
                    {error.isError && (
                        <Message negative>
                            <Message.Header>Something went wrong</Message.Header>
                            <p>{error.message}</p>
                        </Message>
                    )}
                    <Form.Field error={!!values.errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@example.com"
                            value={values.data.email}
                            onChange={onChange}
                        />
                        {values.errors.email && <InlineError text={values.errors.email}/>}
                    </Form.Field>
                    <Form.Field error={!!values.errors.password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Make it secure"
                            value={values.data.password}
                            onChange={onChange}
                        />
                        {values.errors.password && <InlineError text={values.errors.password}/>}
                    </Form.Field>
                    <Button disabled={loading} loading={loading} className='btn-submit btn-primary '>Login</Button>
                    <span style={{color: 'white'}}> or </span> <Link to="/signup"> <span className='sign-up-link'>Sign up</span></Link>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default LoginForm;
import React, {ChangeEvent, useState} from "react";
import {Button, Form, Grid, Header, Icon, Message} from "semantic-ui-react";
import InlineError from "../../messages/InlineError";
import {Link} from "react-router-dom";
import validations from "../../utils/validations";
import {clearErrors} from "../../store/actions/users";
import {useDispatch} from "react-redux";

const SignUpForm: React.FC<SignUpFormProps> = ({ submit, loading, error }) => {

    const [values, setValues] = useState({
        loading: false, data: {email: '', password: '', name: '', confirmPassword: ''},
        showPassword: false,
        confirmPassword: '',
        errors: {password: '', confirmPassword: '', email: '', name: ''},
    });

    const dispatch = useDispatch();

    const onSubmit = () => {
        const { data } = values;
        let errors = {name: '', password: '', confirmPassword: '', email: ''};
        const isPasswordValid = validations.validatePassword(data.password);
        const isEmailValid = validations.validateEmail(data.email);
        const isNameValid = validations.validateName(data.name);
        const passwordMatch = data.password !== data.confirmPassword;
        if (!isEmailValid) {
            errors.email = 'Invalid email';
            setValues({...values, errors: {...values.errors, ...errors}})
        }
        if (!isPasswordValid) {
            errors.password = 'Password should have a minimum of 4 characters';
            setValues({...values, errors: {...values.errors, ...errors}})
        }
         if (!isNameValid) {
             errors.name = 'Name should have a minimum of 4 characters';
             setValues({...values, errors: {...values.errors, ...errors}})
        } if (passwordMatch) {
            errors.confirmPassword = 'Password mismatch';
            setValues({...values, errors: {...values.errors, ...errors}})
        } else if (isEmailValid && isPasswordValid && isNameValid && !passwordMatch){
            submit(values.data);
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(clearErrors);
        setValues({
            ...values, data: {...values.data, [e.target.name]: e.target.value},
            errors: {...values.errors, [e.target.name]: ''}
        })
    }

    const togglePassword = () => {
        setValues({...values, showPassword: !values.showPassword });
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column textAlign='left' id="signup-form" style={{ maxWidth: 450 }}>
                <Header as='h2'>
                    Sign Up
                </Header>
                <Form onSubmit={onSubmit} loading={loading}>
                    {error.isError && (
                        <Message negative>
                            <Message.Header>Something went wrong</Message.Header>
                            <p>{error.message}</p>
                        </Message>
                    )}
                    <Form.Field  error={!!values.errors.name}>
                        <label htmlFor="password">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.data.name}
                            onChange={onChange}
                        />
                        {values.errors.name && <InlineError text={values.errors.name} />}
                    </Form.Field>

                    <Form.Field error={!!values.errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="username@email.com"
                            value={values.data.email}
                            onChange={onChange}
                        />
                        {values.errors.email && <InlineError text={values.errors.email} />}
                    </Form.Field>

                    <Form.Field error={!!values.errors.password} icon='search'>
                        <label htmlFor="password">Password</label>
                        <Form.Input
                            icon = {<Icon name={values.showPassword ? 'eye slash' : 'eye'} link onClick={togglePassword}/>}
                            type={values.showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={values.data.password}
                            onChange={onChange}
                        />
                        {values.errors.password && <InlineError text={values.errors.password } />}
                    </Form.Field>

                    <Form.Field error={!!values.errors.confirmPassword} icon='search'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Form.Input
                            icon = {<Icon name={values.showPassword ? 'eye slash' : 'eye'} link onClick={togglePassword}/>}
                            type={values.showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={values.data.confirmPassword}
                            onChange={onChange}
                        />
                        {values.errors.confirmPassword && <InlineError text={values.errors.confirmPassword} />}
                    </Form.Field>
                    <Button disabled={loading} loading={loading} className='btn-submit btn-primary'>Sign Up</Button>
                    <Link to="/login">  <span  style={{color: 'black', textDecoration: 'underline'}}>Login? </span></Link>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default SignUpForm;
import {Button, Form, Grid, Header, Message} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import React from "react";
import { Link } from "react-router-dom";
import InlineError from "../messages/InlineError";


const LoginForm: React.FC<LoginFormProps> = ({submit, loading, error}) => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data: any) => {
        //start saving
        submit(data);
    }
    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column textAlign='left' id="signup-form" style={{maxWidth: 450}}>
                <Header as='h2'>
                    Login
                </Header>

                <Form data-testid={'login-form'} onSubmit={handleSubmit(onSubmit)} loading={loading}>
                    {error && (
                        <Message negative>
                            <Message.Header>{'Invalid Credentials'}</Message.Header>
                        </Message>
                    )}
                    <Form.Field error={!!errors.email}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@example.com"
                            ref={register({
                                required: "Email is required",
                                pattern: {
                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Invalid Email'
                                }
                            })}
                        />
                        <InlineError errors={errors} name={'email'} />
                    </Form.Field>
                    <Form.Field error={!!errors.password}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Make it secure"
                            ref={register({ required: "Password is required" })}
                        />
                        <InlineError errors={errors} name={'password'} />
                    </Form.Field>
                    <Button data-testid={'submit-btn'} disabled={loading} loading={loading} className='btn-submit btn-primary '>Login</Button>
                    <span style={{color: 'white'}}> or </span> <Link to="/signup"> <span className='sign-up-link'>Sign up</span></Link>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default LoginForm;

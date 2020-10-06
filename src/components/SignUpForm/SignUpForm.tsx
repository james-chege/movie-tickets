import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Icon, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUpForm: React.FC<SignUpFormProps> = ({ submit, loading, error }) => {
  const { register, handleSubmit, setValue, watch, errors } = useForm();

  const [values, setValues] = useState({ showPassword: false });

  useRegister(watch, register);

  const onSubmit = (data: any) => {
    submit(data);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, { name, value }: any) => {
    setValue(name, value);
  };

  const togglePassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column textAlign="left" id="signup-form" style={{ maxWidth: 450 }}>
        <Header as="h2">Sign Up</Header>
        <Form onSubmit={handleSubmit(onSubmit)} loading={loading}>
          {error && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{error.message}</p>
            </Message>
          )}
          <Form.Field error={!!errors.name}>
            <label htmlFor="password">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              ref={register({ required: "Name is required" })}
            />
            {errors.name && <InlineError errors={errors} name={"name"} />}
          </Form.Field>

          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="username@email.com"
              ref={register({
                required: "Email is required",
                pattern: {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid Email",
                },
              })}
            />
            {errors.email && <InlineError errors={errors} name={"email"} />}
          </Form.Field>

          <Form.Field error={!!errors.password} icon="search">
            <label htmlFor="password">Password</label>
            <Form.Input
              icon={
                <Icon
                  name={values.showPassword ? "eye slash" : "eye"}
                  link
                  onClick={togglePassword}
                />
              }
              type={values.showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={onChange}
            />
            {errors.password && (
              <InlineError errors={errors} name={"password"} />
            )}
          </Form.Field>

          <Form.Field error={!!errors.confirmPassword} icon="search">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Form.Input
              icon={
                <Icon
                  name={values.showPassword ? "eye slash" : "eye"}
                  link
                  onClick={togglePassword}
                />
              }
              type={values.showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={onChange}
            />
            {errors.confirmPassword && (
              <InlineError errors={errors} name={"confirmPassword"} />
            )}
          </Form.Field>
          <Button
            disabled={loading}
            loading={loading}
            className="btn-submit btn-primary"
          >
            Sign Up
          </Button>
          <Link to="/login">
            {" "}
            <span style={{ color: "black", textDecoration: "underline" }}>
              Login?{" "}
            </span>
          </Link>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const useRegister = (watch: any, register: any) => {
  useEffect(() => {
    register(
      { name: "email" },
      {
        required: "Email is required",
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Invalid Email",
        },
      }
    );
    register(
      { name: "confirmPassword" },
      {
        required: "Confirmation Password is required",
        validate: (value: any) =>
          value === watch("password") || "Passwords mismatch",
      }
    );
    register({ name: "password" }, { required: "Password is required" });
  }, []);
};

export default SignUpForm;

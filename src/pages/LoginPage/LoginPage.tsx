import React from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import { login } from "../../store/actions/users";
import { useMutation } from "react-query";

const LoginPage: React.FC<LoginPageProps> = () => {
  const history = useHistory();
  const [mutate, { isLoading, data, error }] = useMutation(login);
  const submit = async (data: LoginPageProps["data"]) => {
    await mutate(data);
  };

  if (data) {
    new Promise(resolve => {
      resolve(window.localStorage.setItem('token', data.token));
    }).then(() => {
      history.push("/booking");
      window.location.reload()
    }); // Todo: wubba lubba dub dub
  }

  return (
    <div>
      <LoginForm
        submit={submit}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default LoginPage;

import React from "react";
import { useHistory } from "react-router-dom";

import LoginForm from "../../components/LoginForm/LoginForm";
import { login } from "../../store/actions/users";
import { queryCache, useMutation } from "react-query";

const LoginPage: React.FC<LoginPageProps> = () => {
  const history = useHistory();
  const [mutate, { isLoading, data, error }] = useMutation(login);
  const submit = async (data: LoginPageProps["data"]) => {
    await mutate(data);
  };

  if (data) {
    history.push("/booking");
  }

  queryCache.setQueryData("user", data);

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

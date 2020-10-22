import React from "react";
import { useHistory } from "react-router-dom";

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useMutation } from "react-query";
import { signup } from "../../store/actions/users";

const SignUpPage: React.FC = () => {
  const [mutate, { isLoading, data, error }] = useMutation(signup);
  const history = useHistory();
  const submit = async (data: SignUpPageProps["data"]) => {
    await mutate(data);
  };

  if (data) {
    history.push("/booking");
    window.location.reload(); // Todo: wubba lubba dub dub
  }

  return (
    <div>
      <SignUpForm submit={submit} loading={isLoading} error={error} />
    </div>
  );
};
export default SignUpPage;

import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleOnSuccess = (response) => {
    console.log("Login Successful", response);
  };

  const handleOnFailure = () => {
    console.log("Failed to log in");
  };
  return <GoogleLogin onSuccess={handleOnSuccess} onError={handleOnFailure} />;
};

export default Login;

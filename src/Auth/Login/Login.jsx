import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginUI from "./LoginUI.jsx"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setErrors("Please, enter your data");
    } else if (!email) {
      setErrors("Please, enter your email");
    } else if (!password) {
      setErrors("Please, enter your password");
    } else {
      fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            localStorage.setItem("token", `${data.access_token}`);
            localStorage.setItem("refresh_token", `${data.refresh_token}`); 
            window.location.href = "/";
          } else {
            if (data.message === "Email Not Exist") {
              setEmailError(data.message);
              setPasswordError("");
            } else if (data.message === "In-valid Password") {
              setEmailError("");
              setPasswordError(data.message);
            } else {
              setEmailError("");
              setPasswordError("");
              setErrors(data.message);
            }
          }
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
  };

  return (
    <Fragment>
      <LoginUI
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        errors={errors}
        emailError={emailError}
        passwordError={passwordError}
      />
    </Fragment>
  );
};

export default Login;

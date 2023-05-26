import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResigterUI from "./ResigterUI.jsx";
import axios from "axios";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName && !email && !password && !cPassword) {
      setErrors("please, enter your data");
    } else if (!userName) {
      setErrors("username is required");
    } else if (!image) {
      setErrors("image is required");
    } else if (!email) {
      setErrors("email is required");
    } else if (!password) {
      setErrors("password is required");
    } else if (!cPassword) {
      setErrors("confirm your password");
    }

    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("cPassword", cPassword);
      formData.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.message === "Done") {
        navigate("/login");
        window.alert("Please, check youe Email");
      } else {
        window.alert(data.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <Fragment>
      <ResigterUI
        userName={userName}
        image={image}
        email={email}
        password={password}
        cPassword={cPassword}
        setUsername={setUsername}
        setImage={setImage}
        setEmail={setEmail}
        setPassword={setPassword}
        setCPassword={setCPassword}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </Fragment>
  );
};

export default Register;

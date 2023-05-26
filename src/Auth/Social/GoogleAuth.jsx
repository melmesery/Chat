import axios from "axios";
import React, { Fragment } from "react";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import OAuth2Login from "react-simple-oauth2-login";
import style from "../Styles/Auth.module.css";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    try {
      const accessToken = response.access_token;
      const result = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
      );
      const profile = result.data;
      const { id, name, email } = profile;
      const avatar = profile.picture;
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/social`,
        {
          googleId: id,
          name,
          avatar,
          email,
          provider: "google",
        }
      );
      if (res.data.message === "Done") {
        const { access_token, refresh_token } = res.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        navigate("/");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const onFailure = (error) => {
    throw new Error(error.message);
  };

  return (
    <Fragment>
      <OAuth2Login
        className={style.google}
        authorizationUrl="https://accounts.google.com/o/oauth2/v2/auth"
        responseType="token"
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
        redirectUri={`${import.meta.env.VITE_CLIENT_URL}`}
        onSuccess={onSuccess}
        onFailure={onFailure}
        scope="email profile"
      >
        <span className={style.face}>
          <GrGoogle className=" fs-5" />
        </span>
      </OAuth2Login>
    </Fragment>
  );
};

export default GoogleAuth;

import axios from "axios";
import React, { Fragment } from "react";
import { GrFacebookOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import OAuth2Login from "react-simple-oauth2-login";
import style from "../Styles/Auth.module.css";

const FacebookAuth = () => {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    try {
      const accessToken = response.access_token;
      const result = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${accessToken}`
      );
      const profile = result.data;
      const { id, name, email } = profile;
      const avatar = profile.picture.data.url;

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/social`,
        {
          facebookId: id,
          name,
          avatar,
          email,
          provider: "facebook",
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

  const onFailure = (response) => {
    throw new Error(response.message);
  };

  return (
    <Fragment>
      <OAuth2Login
        className={style.facebook}
        authorizationUrl="https://www.facebook.com/dialog/oauth"
        responseType="token"
        clientId={`${import.meta.env.VITE_FACEBOOK_CLIENT_ID}`}
        redirectUri={`${import.meta.env.VITE_CLIENT_URL}/oauth-callback`}
        scope="public_profile"
        onSuccess={onSuccess}
        onFailure={onFailure}
      >
        <span className={style.face}>
          <GrFacebookOption className="fs-5" />
        </span>
      </OAuth2Login>
    </Fragment>
  );
};

export default FacebookAuth;

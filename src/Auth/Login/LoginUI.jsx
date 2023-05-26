import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookAuth from "../Social/FacebookAuth.jsx";
import GoogleAuth from "../Social/GoogleAuth.jsx";
import Show from "../Related/Show.jsx";
import style from "../Styles/Auth.module.css";
import btn from "../Styles/Button.module.css";

const LoginUI = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  errors,
  emailError,
  passwordError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={style.page}>
      <div className={`${style.page_card} card`}>
        <p className="fw-bold fs-4">Login</p>
        {errors ? <div className={style.error}>{errors}</div> : " "}
        <form className={style.page_form} onSubmit={handleSubmit}>
          <div className={style.input_error}>
            <label className="ps-2">Email</label>
            <br />
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? (
              <p className={style.input_error}>*{emailError}</p>
            ) : (
              " "
            )}
          </div>

          <div className={style.input_error}>
            <label className="ps-2">Password</label>
            <br />
            <div className={`d-flex align-items-center ${style.show_input}`}>
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Show
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            {passwordError ? (
              <p className={style.input_error}>*{passwordError}</p>
            ) : (
              " "
            )}
          </div>

          <Link
            to="/forget-password"
            className={`nav-link ${style.btn_color}`}
            target="_blank"
          >
            Forgotten password?
          </Link>

            <button type="sumbit" className={btn.button}>Submit</button>
         </form>

        <div className="d-flex align-items-center gap-2 mt-4">
          <p className="mb-0 account">Don't have an account?</p>
          <Link
            to="/register"
            className={`text-decoration-none ${style.btn_color}`}
          >
            Register
          </Link>
        </div>
        <div className="d-flex gap-4 align-items-center justify-content-center my-3">
          <hr className={style.hr} />
          <p className="mb-0 text-secondary fs-small">OR</p>
          <hr className={style.hr} />
        </div>
        <div className="d-flex justify-content-center gap-3">
          <GoogleAuth />
          <FacebookAuth />
        </div>
      </div>
    </div>
  );
};

export default LoginUI;

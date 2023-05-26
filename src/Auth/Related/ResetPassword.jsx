import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../Styles/Auth.module.css";
import btn from "../Styles/Button.module.css";

const ResetPassword = () => {
  const [forgetCode, setForgetCode] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!forgetCode || !password || !cPassword) {
      toast.error("Data Required");
      return;
    } else {
      fetch(`${import.meta.env.VITE_BASE_URL}/auth/forgetPassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ forgetCode, password, cPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            window.alert("Password Updated");
            navigate("/");
          } else {
            setErrors(data.message);
          }
        })
        .catch((error) => {
          window.alert(error);
        });
    }
  };
  return (
    <Fragment>
      <div className={style.page}>
        <div className={`${style.page_card} card`}>
          {errors ? <div className={style.error}>{errors}</div> : " "}
          <form onSubmit={handleSubmit} className={style.page_form}>
            <input
              name="forgetCode"
              placeholder="OTP Code"
              type="text"
              value={forgetCode}
              onChange={(e) => setForgetCode(e.target.value)}
            />
            <input
              name="password"
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="cPassword"
              placeholder="Confirm Password"
              type="password"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />

            <button type="sumbit" className={btn.button}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;

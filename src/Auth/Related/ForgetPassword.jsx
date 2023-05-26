import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "../Styles/Auth.module.css";
import btn from "../Styles/Button.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Data Required");
      return;
    } else {
      fetch(`${import.meta.env.VITE_BASE_URL}/auth/sendCode`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            navigate("/reset-password");
            window.alert("Code sent");
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
            <p>Please, enter your email.</p>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default ForgetPassword;

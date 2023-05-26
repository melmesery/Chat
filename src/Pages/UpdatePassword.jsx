import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Show from "../Auth/Related/Show.jsx";
import style from "../Auth/Styles/Auth.module.css";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword && !newPassword && !cPassword) {
      setErrors("Data Required");
      return;
    } else if (!oldPassword) {
      setErrors("Old Password Is Required");
      return;
    } else if (!newPassword) {
      setErrors("New Password Is Required");
      return;
    } else if (!cPassword) {
      setErrors("Confirmation Password Is Required");
      return;
    } else {
      fetch(`${import.meta.env.VITE_BASE_URL}/user/change-password`, {
        method: "PATCH",
        headers: {
          authorization: `${
            import.meta.env.VITE_BEARER_KEY
          }${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword, cPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Done") {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
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
          <form className={style.page_form} onSubmit={handleSubmit}>
            <div className={`d-flex align-items-center ${style.show_input}`}>
              <input
                name="oldPassword"
                placeholder="Old Password"
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Show
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <div className={`d-flex align-items-center ${style.show_input}`}>
              <input
                name="newPassword"
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Show
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <div className={`d-flex align-items-center ${style.show_input}`}>
              <input
                name="cPassword"
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <Show
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <a href="/buttons/41" className="btn41-43 btn-41 nav-link mt-3">
              <button type="submit" className="submit_btn">
                Send
              </button>
            </a>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;

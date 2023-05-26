import React from "react";
import { Link } from "react-router-dom";
import style from "../Auth/Styles/Auth.module.css";
import error from "../Auth/error.svg";

const Error = () => {
  return (
    <div className="container">
      <div className={`row justify-content-center ${style.row_h}`}>
        <div className="col-md-6">
          <img src={error} className="w-100 mx-auto" />
          <br />
          <button className={style.forget_button}>
            <Link to="/" className="nav-link">
              Back Home
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

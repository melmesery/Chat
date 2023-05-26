import React from "react";
import style from "../Styles/Auth.module.css";
import confirmation from "../confirmation.svg";
import { Link } from "react-router-dom";

const EmailConfirmation = () => {
  return (
    <div className="container">
      <div className={`row justify-content-center ${style.row_h}`}>
        <div className="col-md-6">
          <img src={confirmation} className="d-block w-50 mx-auto" />
          <br />
          <button className={`d-block mx-auto mt-5 ${style.page_button}`}>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;

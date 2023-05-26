import React from "react";
import style from "../Styles/Auth.module.css";

const CheckEmail = () => {
  return (
    <div className={style.page}>
      <div className={`${style.page_card} text-center`}>
        <p className="fs-3 text-success mb-0">Please, Check Your Email</p>
      </div>
    </div>
  );
};

export default CheckEmail;

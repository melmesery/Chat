import React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import style from "../Styles/Auth.module.css";

const Show = ({ setShowPassword, showPassword }) => {
  return (
    <div onClick={() => setShowPassword(!showPassword)} className={style.show}>
      {showPassword ? (
        <BsEyeSlashFill className={style.eye} />
      ) : (
        <BsEyeFill className={style.eye} />
      )}
    </div>
  );
};

export default Show;

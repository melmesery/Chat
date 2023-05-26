import React, { useContext } from "react";
import style from "../Styles/Home.module.css";
import { UserContext } from "../Utils/UserAPI.jsx";
import avatar from "../Assets/avatar.png";

const handleLogout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/logout`,
      {
        method: "PATCH",
        headers: {
          authorization: `${
            import.meta.env.VITE_BEARER_KEY
          }${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      window.alert("Unable to log out");
    }
  } catch (error) {
    window.alert(error);
  }
};

const Profile = () => {
  const { userProfile } = useContext(UserContext);

  return (
    <div className={`col-6 col-md-9 ${style.profile}`}>
      <button
        className="bg-danger fw-bold text-white border-0 px-2"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className={style.profile_data}>
        <img
          src={`${userProfile?.image.secure_url || avatar}`}
          alt="Avatar"
          className={style.avatar}
        />
        <h3 className="text-center text-capitalize fw-bold">
          {userProfile?.userName}
        </h3>
      </div>
    </div>
  );
};

export default Profile;

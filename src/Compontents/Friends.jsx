import React, { useContext } from "react";
import avatar from "../Assets/avatar.png";
import style from "../Styles/Home.module.css";
import { UserContext } from "../Utils/UserAPI.jsx";

const Friends = ({ toggleChatArea }) => {
  const { friends } = useContext(UserContext);

  return (
    <div className={`col-5 col-md-3 ${style.chat_list}`}>
      {friends?.map((friend, index) => (
        <div className={style.chat_drop} key={index}>
          <img
            src={avatar}
            className={style.friend_avatar}
            alt="Friend Avatar"
            onClick={() => toggleChatArea(friend)}
          />
          <p className={style.name}>{friend.userName}</p>
          <div
            className={
              friend.status == "online" ? style.status_green : style.status_red
            }
          >
            O
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;

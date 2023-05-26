import React, { Fragment } from "react";
import Chat from "../Compontents/Chat.jsx";
import { UserAPI } from "../Utils/UserAPI.jsx";

const Home = () => {
  return (
    <UserAPI>
      <Chat />
    </UserAPI>
  );
};

export default Home;

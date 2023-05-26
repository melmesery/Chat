import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import { clientIo, token } from "../App.jsx";
import style from "../Styles/Home.module.css";
import { UserContext } from "../Utils/UserAPI.jsx";
import Friends from "./Friends.jsx";
import Profile from "./Profile.jsx";

const Chat = () => {
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState([]);
  const chatAreaRef = useRef(null);

  const { friends, userProfile } = useContext(UserContext);

  useEffect(() => {
    clientIo.on("receiveMessage", (data) => {
      setNewMessage((prevMessages) => [...prevMessages, data]);
      getUpdatedChat(selectedChat?._id, data);
    });

    return () => {
      clientIo.off("receiveMessage");
    };
  }, [selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      getChat(selectedChat._id);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chat]);

  const toggleChatArea = (friend) => {
    if (selectedChat && selectedChat._id === friend._id) {
      setSelectedChat(null);
    } else {
      setSelectedChat(friend);
    }
  };

  const getChat = (destId) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/chat/ovo/${destId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data.chat);
      })
      .catch((error) => {
        window.alert(error)
      });
  };

  const getUpdatedChat = (chatId, newMessageData) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/chat/ovo/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data.chat);
      })
      .catch((error) => {
        window.alert(error)
      });
  };

  const createChat = (destId) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${
          import.meta.env.VITE_BEARER_KEY
        }${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ destId, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("");
        setChat(data.chat);
      })
      .catch((error) => {
        window.alert(error)
      });
  };

  return (
    <div className="container">
      <div
        className={`row align-items-start justify-content-center my-5 ${style.chat}`}
      >
        <div className="col-md-7">
          <div className="row">
            <Profile userProfile={userProfile} />
            <Friends toggleChatArea={toggleChatArea} />
          </div>
        </div>

        {selectedChat && (
          <div className={`col-10 col-md-7 shadow p-4 mt-5 ${style.chat_text}`}>
            <div className="row d-flex justify-content-end">
              <div>
                <div className={style.chat_area} ref={chatAreaRef}>
                  {chat ? (
                    chat.messages.map((message, index) => (
                      <div
                        className={`col-md-6 ${
                          message.from === userProfile?._id
                            ? ""
                            : "offset-md-6 d-grid justify-content-end"
                        }`}
                        key={index}
                      >
                        <p
                          className={`${
                            message.from === userProfile?._id
                              ? style.friend
                              : style.me
                          }`}
                        >
                          {message.message}
                          <br />
                          <span className={style.message_time}>
                            {moment(message.time).format(
                              "YYYY-MM-DD | HH:mm:ss"
                            )}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">
                      Say Hi to start the conversation...
                    </p>
                  )}
                </div>
                <form
                  className="mt-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (selectedChat) {
                      createChat(selectedChat._id);
                    }
                  }}
                >
                  <input
                    name="message"
                    placeholder="Type your message..."
                    type="text"
                    value={message}
                    className={style.message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit" className={style.message_btn}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

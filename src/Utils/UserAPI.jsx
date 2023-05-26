import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserAPI = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchFriends();
    fetchUserProfile();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `${
            import.meta.env.VITE_BEARER_KEY
          }${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setFriends(data.users);
    } catch (error) {
      window.alert(error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `${
              import.meta.env.VITE_BEARER_KEY
            }${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUserProfile(data.user);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <UserContext.Provider value={{ friends, userProfile }}>
      {children}
    </UserContext.Provider>
  );
};

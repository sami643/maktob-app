import React, { useState, useEffect } from "react";
import "./App.css";
import { UserContext } from "./context/userContext";
import Application from "./context/application";

import { Auth } from "./context/authentication";
const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("user");
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? <Auth /> : <Application />}
    </UserContext.Provider>
  );
};

export default App;

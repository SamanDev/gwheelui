import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import BoardUser from "./components/BoardUser";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { startServiceWorker } from "./utils/include";

import EventBus from "./common/EventBus";
const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);
  useEffect(() => {
    EventBus.on("setuser", (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      EventBus.dispatch("user", data);
    });
    return () => {
      EventBus.remove("setuser");
    };
  }, []);

  return (
    <Routes>
      <Route path="*" element={<BoardUser />} />
    </Routes>
  );
};

export default App;

import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import BoardUser from "./components/BoardUser";
import $ from "jquery";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import EventBus from "./common/EventBus";
const AppOrtion = (agel) => {
  var scale = window.outerWidth / 1100;
  if (agel == 90 && scale < 1) {
    //window.parent.postMessage("AppOrtion", "*");
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width, initial-scale=" +
          scale +
          ",maximum-scale=" +
          scale +
          ""
      );
  } else {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width,initial-scale=1,maximum-scale=1"
      );
  }
};
const App = () => {
  localStorage.removeItem("user");
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.parent.postMessage("AppOrtion", "*");
    }, 400);
    window.addEventListener("orientationchange", (event) => {
      setTimeout(() => {
        window.parent.postMessage("AppOrtion", "*");
      }, 400);
    });
  }, []);
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
    window.parent.postMessage("userget", "*");
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

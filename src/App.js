import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import BoardUser from "./components/BoardUser";

import EventBus from "./common/EventBus";

const App = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("mytime");
  function inIframe() {
    try {
      return window.self == window.top;
    } catch (e) {
      return false;
    }
  }
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
  if (window.self == window.top) {
    window.location.href = "https://www.google.com/";
  }
  return (
    <Routes>
      <Route path="*" element={<BoardUser />} />
    </Routes>
  );
};

export default App;

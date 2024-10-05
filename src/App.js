import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/App.css";
import "animate.css";

import BoardUser from "./components/BoardUser";
import EventBus from "./common/EventBus";

const App = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("mytime");

  useEffect(() => {
    window.parent.postMessage("userget", "*");
    EventBus.on("setuser", (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      EventBus.dispatch("user", data);
    });
    window.addEventListener(
      "focus",
      () => {
        //$("#reconn").trigger("click");
      },
      { once: true }
    );
    return () => {
      EventBus.remove("setuser");
    };
  }, []);
  if (window.self == window.top) {
   // window.location.href = "https://www.google.com/";
  }
  return (
    <Routes>
      <Route path="*" element={<BoardUser />} />
    </Routes>
  );
};

export default App;

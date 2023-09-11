import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import Comment from "../utils/msg";

function ChatWheel(prop) {
  const [userbets, setuserbets] = useState([]);

  useEffect(() => {
    EventBus.on("chat", (data) => {
      if (data != []) {
        setuserbets((current) => [...current, data]);
      }
    });
    return () => {
      EventBus.remove("chat");
    };
  }, []);
  useEffect(() => {
    document.getElementById("chatarea").scroll({
      top: userbets.length * 100,

      behavior: "smooth",
    });
  }, [userbets]);

  return (
    <div
      className="mainwheel"
      id="chatarea"
      style={{
        width: "150%",
        height: 260,
        overflow: "auto",
        paddingLeft: 10,
        overflowX: "hidden",
        zIndex: 100,
        marginTop: 10,
      }}
    >
      {userbets.map((cmd, i) => {
        return (
          <Comment
            key={i}
            username={cmd.username}
            image={cmd.image}
            txt={cmd.txt}
            wheel={cmd?.wheel}
          />
        );
      })}
    </div>
  );
}

export default ChatWheel;

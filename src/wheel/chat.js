import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import Comment from "../utils/msg";

function ChatWheel(prop) {
  const [userbets, setuserbets] = useState([]);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
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
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });

    return () => {
      EventBus.remove("wheel");
    };
  }, []);
  return (
    <div
      style={
        wheel?.status != "Pending"
          ? { transition: "all 0.5s ease-in", transformOrigin: "top center" }
          : {
              opacity: 0.7,
              transformOrigin: "top center",
              transform: "scale(.5)",
              transition: "all 0.5s ease-in",
            }
      }
    >
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
    </div>
  );
}

export default ChatWheel;

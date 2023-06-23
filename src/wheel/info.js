import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import { Jetton, UsersIcon, formatDollar } from "../utils/include";

function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
  const [online, setOnline] = useState(1);
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    EventBus.on("user", (data) => {
      setUser(data);
      setBalance(data.balance2);
    });
    EventBus.on("balance", (data) => {
      setBalance(data);
    });
    EventBus.on("online", (data) => {
      setOnline(data);
    });
    EventBus.on("users", (data) => {
      data
        .filter(
          (u) => u.username == user.username && u.win > 0
          //s(u) => parseInt(u.position) == parseInt(pos)
        )

        .map((item, i) => {
          var newuser = JSON.parse(localStorage.getItem("user"));
          EventBus.dispatch("balance", newuser.balance2 + item.win);
        });
    });
    return () => {
      EventBus.remove("user");
      EventBus.remove("balance");
      EventBus.remove("online");
    };
  }, []);
  useEffect(() => {
    var newuser = JSON.parse(localStorage.getItem("user"));
    try {
      newuser.balance2 = balance;
      localStorage.setItem("user", JSON.stringify(newuser));
    } catch (error) {}
  }, [balance]);
  if (!user?.image) {
    return false;
  }
  return (
    <>
      <div className="info">
        <img
          src={
            "https://khodekhalse.com/assets/images/stars/lvl" +
            user?.image +
            ".webp"
          }
          style={{ height: 40 }}
        />
        <b>{user?.username}</b>
        <div style={{ float: "right" }}>
          <span>{online}</span>{" "}
          <span>
            {" "}
            <UsersIcon
              colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
              style={{ width: 25, height: 25 }}
            />
          </span>
          <span>
            <Jetton />
          </span>{" "}
          <span>
            {" "}
            {balance == -1
              ? formatDollar(user?.balance2)
              : formatDollar(balance)}
          </span>
        </div>
      </div>
    </>
  );
}

export default BetsWheel;

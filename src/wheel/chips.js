import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";

function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  const [balance, setBalance] = useState(oldduser?.balance2);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("user", (data) => {
      setUser(data);
      setBalance(data.balance2);
    });
    EventBus.on("balance", (data) => {
      var newuser = JSON.parse(localStorage.getItem("user"));
      if (newuser?.username) {
        newuser.balance2 = data;
        localStorage.setItem("user", JSON.stringify(newuser));
        setBalance(data);
        setUser(newuser);
      }
    });

    EventBus.on("balance", (data) => {
      setBalance(data);
    });
    return () => {
      setWheel();
      EventBus.remove("user");
      EventBus.remove("balance");
      EventBus.remove("wheel");
    };
  }, []);
  useEffect(() => {
    var bet = prop.bet;
    var nextbet = bet;

    if (nextbet > balance) {
      nextbet = 500;
    }
    if (nextbet > balance) {
      nextbet = 100;
    }
    if (nextbet > balance) {
      nextbet = 25;
    }
    if (nextbet > balance) {
      nextbet = 5;
    }
    if (nextbet > balance) {
      nextbet = 1;
    }
    if (nextbet != bet) {
      prop.setBet(nextbet);
    }
  }, [balance]);
  return (
    <div
      style={wheel?.status != "Pending" ? { opacity: 0.5 } : { opacity: 1 }}
      className="chipps"
    >
      <div>
        <div style={user?.balance2 >= 1 ? {} : { opacity: 0.5 }}>
          <GetChip chip={1} {...prop} />
        </div>
        <div style={user?.balance2 >= 5 ? {} : { opacity: 0.5 }}>
          <GetChip chip={5} {...prop} />
        </div>
        <div style={user?.balance2 >= 25 ? {} : { opacity: 0.5 }}>
          <GetChip chip={25} {...prop} />
        </div>
        <div style={user?.balance2 >= 100 ? {} : { opacity: 0.5 }}>
          <GetChip chip={100} {...prop} />
        </div>
        <div style={user?.balance2 >= 500 ? {} : { opacity: 0.5 }}>
          <GetChip chip={500} {...prop} />
        </div>
      </div>
    </div>
  );
}

export default BetsWheel;

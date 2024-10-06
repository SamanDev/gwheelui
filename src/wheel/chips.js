import React, { useState, useEffect } from "react";
import GetChip from "../getChips";
import EventBus from "../common/EventBus";

function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  const [balance, setBalance] = useState(oldduser?.balance);
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
    EventBus.on("user", (data) => {
      setUser(data);
      setBalance(data.balance);
    });
    EventBus.on("balance", (data) => {
      var newuser = JSON.parse(localStorage.getItem("user"));
      if (newuser?.username) {
        newuser.balance = data;
        localStorage.setItem("user", JSON.stringify(newuser));
        setBalance(data);
        setUser(newuser);
      }
    });

    EventBus.on("balance", (data) => {
      setBalance(data);
    });
    
  }, []);
  useEffect(() => {
    var bet = prop.bet;
    var nextbet = bet;

    if (nextbet > balance) {
      nextbet = 5000000;
    }
    if (nextbet > balance) {
      nextbet = 1000000;
    }
    if (nextbet > balance) {
      nextbet = 500000;
    }
    if (nextbet > balance) {
      nextbet = 250000;
    }
    if (nextbet > balance) {
      nextbet = 50000;
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
        
        <div style={user?.balance >= 50000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={50000} {...prop} />
        </div>
        <div style={user?.balance >= 250000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={250000} {...prop} />
        </div>
        <div style={user?.balance >= 500000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={500000} {...prop} />
        </div>
        <div style={user?.balance >= 1000000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={1000000} {...prop} />
        </div>
        <div style={user?.balance >= 5000000 ? {} : { opacity: 0.5 }}>
          <GetChip chip={5000000} {...prop} />
        </div>
      </div>
    </div>
  );
}

export default BetsWheel;

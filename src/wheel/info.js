import React, { useState, useEffect } from "react";
import EventBus from "../common/EventBus";
import { Jetton, UsersIcon, formatDollar } from "../utils/include";
import { Icon, Label } from "semantic-ui-react";
function BetsWheel(prop) {
  const oldduser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(oldduser);
  const [online, setOnline] = useState(1);
  const [balance, setBalance] = useState(user?.balance2);
  useEffect(() => {
    window.addEventListener("message", function (event) {
      if (event?.data?.username) {
        localStorage.setItem("user", JSON.stringify(event?.data));

        EventBus.dispatch("user", event.data);
        EventBus.dispatch("balance", event.data.balance2);
      }
    });
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
  if (!user?.username) {
    return false;
  }
  var url =
    window.location != document.referrer &&
    window.location.toString().indexOf(":") == -1
      ? document.referrer
      : "https://www.khodekhalse.com/";
  return (
    <>
      <div className="info">
        <img
          src={url + "assets/images/stars/lvl" + user?.image + ".webp"}
          style={{ height: 35, marginRight: 10 }}
        />
        <b>{user?.username}</b>
        <div style={{ float: "right" }}>
          <span>
            <Label color="black">
              <UsersIcon
                colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
                style={{ width: 20, height: 20 }}
              />
              {online}
            </Label>
            <Label color="black">
              <Jetton />
              {balance == -1
                ? formatDollar(user?.balance2)
                : formatDollar(balance)}
            </Label>
          </span>
        </div>
      </div>
    </>
  );
}

export default BetsWheel;

import { io } from "socket.io-client";
import EventBus from "./common/EventBus";
// "undefined" means the URL will be computed from the `window.location` object

const URL =
  process.env.NODE_ENV === "production"
    ? "https://server.wheelofpersia.com/wheel"
    : "https://server.wheelofpersia.com/wheel";
    const URL2 =
    process.env.NODE_ENV === "production"
      ? "http://localhost:2424/wheel"
      : "http://localhost:2424/wheel";
const url = window.location.href.toString().split("/");

export const socket = io(URL, {
  auth: {
    username: url[url.length - 1],
    token: url[url.length - 2],
  },
  autoConnect: false,
});


function onConnect() {
  EventBus.dispatch("connect", true);
  socket.on("msg", ({ command, data }) => {
    if (command == "update") {
      localStorage.setItem("wheel", JSON.stringify(data));
      EventBus.dispatch("wheel", data);
    }
    if (command == "users") {
      EventBus.dispatch("users", data);
    }
    if (command == "bets") {
      EventBus.dispatch("bets", data);
    }
    if (command == "resetusers") {
      EventBus.dispatch("resetusers");
    }
    if (command == "user") {
      EventBus.dispatch("user", data);
    }
    if (command == "setuser") {
      EventBus.dispatch("setuser", data);
    }

    if (command == "online") {
      EventBus.dispatch("online", data);
    }
    if (command == "chat") {
      EventBus.dispatch("chat", data);
    }
    if (command == "date") {
      EventBus.dispatch("mytime", data);
    }

    if (command == "disconnect") {
      socket.disconnect();
    }
  });
}
function onDisConnect() {
  EventBus.dispatch("disconnect");
}
socket.once("connect", onConnect);
socket.on("disconnect", onDisConnect);
export default socket;

import { useState, useEffect } from "react";

import EventBus from "../common/EventBus";
export const useServerTime = () => {
  const [servertime, setMytime] = useState(0);

  useEffect(() => {
    EventBus.on("mytime", (dataGet) => {
      setMytime(dataGet);
      localStorage.setItem("mytime", dataGet);
    });
  }, []);

  return [servertime];
};

import React, { useState, useEffect } from "react";
import $ from "jquery";
import { segments, getcolor } from "../utils/include";
import EventBus from "../common/EventBus";
import { useServerTime } from "../components/time";
var timer;

function checkbox() {
  if ($("#cadr2:visible").length) {
    $("#cadr").show();
    $("#cadr2").hide();
  } else {
    $("#cadr2").show();
    $("#cadr").hide();
  }
}
var lighter;

const updateWheelborder = (wheel) => {
  if (!wheel?.status) return false;
  var colornum = getcolor(segments[wheel?.number]);
  if (wheel?.status == "Spin") {
    colornum = "#000000";
  } else {
  }
  if (wheel?.status == "Pending") {
    colornum = getcolor(segments[wheel?.startNum]);
  }
  if ($(".mainwheel .bhdLno >div").length) {
    $(".mainwheel .bhdLno >div").css({
      border: "12px solid " + colornum + "",
    });
  } else {
    setTimeout(() => {
      updateWheelborder(wheel);
    }, 1000);
  }
};
function CountWheel(prop) {
  const [time, setTime] = useState(0);

  const [openads, setOpenads] = useState(false);
  const [wheel, setWheel] = useState(prop.wheel);
  const [servertime] = useServerTime();

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        clearInterval(lighter);

        setWheel(data);

        updateWheelborder(data);
      }
    });

    return () => {
      setWheel();
      clearInterval(lighter);
      clearTimeout(timer);

      EventBus.remove("wheel");
    };
  }, []);

  useEffect(() => {
    clearInterval(lighter);
    if (wheel?.status == "Pending") {
      setTime(0);
      clearTimeout(timer);
      mytime();
      updateWheelborder(wheel);
      lighter = setInterval(() => {
        checkbox();
      }, 1900);
    } else {
      setTime(0);
      clearTimeout(timer);
      updateWheelborder(wheel);
      mytime();
      lighter = setInterval(() => {
        checkbox();
      }, 800);
    }
  }, [wheel?.status]);
  useEffect(() => {
    mytime();
  }, [servertime]);

  const mytime = () => {
    if (wheel?.status) {
      var t1 = new Date(wheel?.date);
      var t2 = new Date(servertime);

      var dif = t2.getTime() - t1.getTime();

      var Seconds_from_T1_to_T2 = dif / 1000;
      var Seconds_Between_Dates = parseInt(Math.abs(Seconds_from_T1_to_T2));
      if (Seconds_Between_Dates >= 0 && Seconds_Between_Dates <= 16) {
        setTime(parseInt(Seconds_Between_Dates));
      }
    }
  };
  if (!wheel?.status) {
    return (
      <div className="count">
        <h2 className="text-shadows">wait</h2>
      </div>
    );
  }
  return (
    <>
      {15 - time > 0 && time > 0 && time < 15 && (
        <>
          <div className="count" style={{ zIndex: 11, marginTop: -170 }}>
            <h2 className="text-shadows">{15 - time}</h2>
          </div>
        </>
      )}
    </>
  );
}

export default CountWheel;

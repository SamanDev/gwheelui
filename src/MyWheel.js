import React from "react";
import ShowWheel from "./wheel/wheel";
import BottomWheel from "./wheel/bottom";
import InfoWheel from "./wheel/info";

function MNyWheel() {
  return (
    <>
      <InfoWheel />
      <div className="cadr">
        <ShowWheel />

        <BottomWheel />
      </div>
    </>
  );
}

export default MNyWheel;

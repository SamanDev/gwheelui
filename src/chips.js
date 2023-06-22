import React from "react";
const getColor = (num) => {
  if (num == "1") {
    return "white";
  }
  if (num == "5") {
    return "red";
  }
  if (num == "25") {
    return "blue";
  }
  if (num == "100") {
    return "black";
  }
  if (num == "500") {
    return "green";
  }
  if (num == "1000") {
    return "bnfsh";
  }
  if (num == "5000") {
    return "golds";
  }
};
function App(prop) {
  return (
    <>
      <div
        onClick={() => {
          prop.setBet(prop.chip);
        }}
        style={prop.style}
        className={prop.bet == prop.chip ? "chips active" : "chips"}
      >
        <div
          className={"pokerchip " + getColor(prop.chip) + " " + prop.className}
        ></div>
      </div>
    </>
  );
}

export default App;

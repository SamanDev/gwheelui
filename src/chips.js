import React from "react";
const getColor = (num) => {
  if (num == "50000") {
    return "white";
  }
  if (num == "250000") {
    return "red";
  }
  if (num == "500000") {
    return "blue";
  }
  if (num == "1000000") {
    return "bnfsh";
  }
  
  if (num == "5000000") {
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

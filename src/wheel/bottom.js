import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";
import ChatWheel from "./chat";
import ChipsWheel from "./chips";
import EventBus from "../common/EventBus";
import CountWheel from "./count";

const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 50000
  );
  const [wheel, setWheel] = useState(JSON.parse(localStorage.getItem("wheel")));
  
  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        setWheel(data);
      }
    });
  
  }, []);

  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);
  return (
    <>
     
      <Grid columns="three" className={wheel?.status}>
        <Grid.Row style={{ margin: 0 }}>
          <Grid.Column>
            <BetsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
          <Grid.Column>
          <CountWheel wheel={wheel} />
            <ChatWheel />
          </Grid.Column>
          <Grid.Column className="bet">
            <ChipsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GridExampleDividedPhrase;

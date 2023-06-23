import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";

import ChipsWheel from "./chips";
import ChatWheel from "./chat";
import SendChatWheel from "./sendchat";
const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 5
  );

  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);
  return (
    <>
      <Grid columns="three">
        <Grid.Row style={{ margin: 0 }}>
          <Grid.Column style={{ padding: 0 }}>
            <BetsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
          <Grid.Column style={{ padding: 0 }}></Grid.Column>
          <Grid.Column style={{ padding: 0 }}>
            <ChipsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GridExampleDividedPhrase;

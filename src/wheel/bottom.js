import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import BetsWheel from "./bets";

import ChipsWheel from "./chips";
const GridExampleDividedPhrase = (prop) => {
  const [bet, setBet] = useState(
    localStorage.getItem("setbet") ? localStorage.getItem("setbet") : 5
  );

  useEffect(() => {
    localStorage.setItem("setbet", bet);
  }, [bet]);
  return (
    <>
      <Grid columns="two">
        <Grid.Row style={{ margin: 0 }}>
          <Grid.Column>
            <BetsWheel bet={bet} setBet={setBet} />
          </Grid.Column>

          <Grid.Column>
            <ChipsWheel bet={bet} setBet={setBet} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GridExampleDividedPhrase;

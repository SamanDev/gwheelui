import React, { useState, useEffect } from "react";

import Mywhell from "../MyWheel";

import { Dimmer, Icon, Header, Button, Modal } from "semantic-ui-react";
import EventBus from "../common/EventBus";
import socket from "../socket";
const BoardUser = () => {
  const [userDC, setUserDC] = useState(false);
  useEffect(() => {
    socket.connect();

    return () => {
      setUserDC(true);
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    EventBus.on("disconnect", (data) => {
      setUserDC(true);
    });
    EventBus.on("connect", (data) => {
      setUserDC(false);
    });

    return () => {
      EventBus.remove("disconnect");
    };
  }, []);

  return (
    <div className="home wheel">
      <Modal basic open={userDC ? true : false} size="small">
        <Header icon style={{ marginTop: 80 }}>
          <Icon name="ban" color="red" />
          Connection lost!
        </Header>

        <Modal.Actions style={{ textAlign: "center" }}>
          <Button
            basic
            id="reconn"
            onClick={() => {
              socket.connect();
            }}
            color="orange"
          >
            Reconnect
          </Button>
        </Modal.Actions>
      </Modal>
      <Mywhell />
    </div>
  );
};

export default BoardUser;

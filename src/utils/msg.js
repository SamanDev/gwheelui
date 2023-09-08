import React from "react";
import { Comment, Image, Label, Divider } from "semantic-ui-react";
import { getcolor, getcolortext } from "./include";
import Mod from "../modal";
var item = {
  status: "Spin",
  number: 6,
  total: 0,
  net: 0,
  serverCode: 6881,
  serverSec: 39,
  startNum: 27,
  date: "2023-09-08T00:46:09.538Z",
  wheelusers: [],
  _id: "64fa6ed1ba66418901565634",
  __v: 0,
};
const CommentExampleMetadata = (prop) => (
  <Comment.Group size="mini">
    <Comment>
      {prop.image && (
        <Comment.Avatar
          as={Image}
          circular
          src={
            "https://khodekhalse.com/assets/images/stars/lvl" +
            prop.image +
            ".webp"
          }
        />
      )}

      <Comment.Content>
        <Comment.Author>{prop.username}</Comment.Author>

        <Comment.Text>
          {prop.txt.indexOf(" WheelDone") > -1 ? (
            <>
              <Mod wheel={prop.wheel} />
              <Label
                size="mini"
                style={{
                  background: getcolor(prop.txt.replace(" WheelDone", "")),
                  color: getcolortext(prop.txt.replace(" WheelDone", "")),
                }}
              >
                x{prop.txt.replace(" WheelDone", "")}
              </Label>

              <Divider clearing inverted />
            </>
          ) : (
            <>{prop.txt}</>
          )}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);

export default CommentExampleMetadata;

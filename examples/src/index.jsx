import ReactDOM from "react-dom";
import React from "react";

import { Wrapper } from "./common";
import { Multi } from "./multiple";
import { Example } from "./example";
import { SomethingWithEvents } from './extended';

ReactDOM.render(
  <Wrapper>
    {/* <Example /> */}
    <Multi/>
    {/* <SomethingWithEvents /> */}
  </Wrapper>, 
  document.getElementById("root")
);
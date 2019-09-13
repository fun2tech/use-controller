import React, { Fragment } from "react";

export const Wrapper = ({ children }) => (
  <Fragment>
    <Style />
    <div id="container">
      {children}
    </div>
  </Fragment>
)

export const Button = ({ inner, ...props }) => (
  <span className="clicky" {...props}>
    {inner}
  </span>
)

export const Thingy = ({ children, ...props }) => (
  <span className="clicky" {...props}>
    {children}
  </span>
)

const Style = () => (
  <style>{`
    body {
      margin: 0;
      padding: 0;
      color: #567ecc;
      font-size: 40px;
    }
    #container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .clicky {
      padding: .2em .4em;
      margin: .5em;
      border-radius: .2em;
      background: #eee;
      text-align: center;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
    }
  `}</style>
)
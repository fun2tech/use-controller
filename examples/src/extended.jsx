import ReactDOM from "react-dom";
import React from "react";
import Controller from 'use-stateful';

export class AsyncEvents extends Controller {
  
  constructor(quote){
    super();
    this.value = quote || "Hello World!";
  }

  didMount(){
    setTimeout(() => {
      this.value = "2 second passed."
    }, 2000)

    setTimeout(() => {
      this.value = "5 seconds passed."
    }, 5000)
  }

  gotClicked(){
    this.value = "I got clicked."
  }
};

export const SomethingWithEvents = () => {
  const { value, gotClicked } = AsyncEvents.use();

  return (
    <div
      className="clicky"
      onClick={gotClicked}>
      {value}
    </div>
  )
};


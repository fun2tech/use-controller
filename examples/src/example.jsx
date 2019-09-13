import React, { useState } from 'react';
import { Button, Thingy } from './common';
import { use } from 'use-stateful';

class SimpleState {
  value = 1

  didMount(){
    setInterval(() => {
      this.value++
    }, 1000)
  }
  
  increment = () => this.value++
  decrement = () => this.value--
}

const Example = () => {
  const { value, increment, decrement } = use(SimpleState);
  
  return (
    <div>
      <Button 
        inner="-"
        onClick={decrement}
      />
      <Thingy>{value}</Thingy>
      <Button 
        inner="+"
        onClick={increment}
      />
    </div>
  )
}

export { Example }
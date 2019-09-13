import React, { useState } from 'react';
import { Button, Thingy } from './common';

const Example = () => {
  const [ valueOne, setValueOne ] = useState(1);
  const [ valueTwo, setValueTwo ] = useState(2);
  const [ valueThree, setValueThree ] = useState(3);

  return (
    <div>
      <div>
        <Button 
          inner="-"
          onClick={() => {
            setValueOne(valueOne - 1)
          }}
        />
        <Thingy>{valueOne}</Thingy>
        <Button 
          inner="+"
          onClick={() => {
            setValueOne(valueOne + 1)
          }}
        />
      </div>
      <div>
        <Button 
          inner="-"
          onClick={() => {
            setValueTwo(valueTwo - 2)
          }}
        />
        <Thingy>{valueTwo}</Thingy>
        <Button 
          inner="+"
          onClick={() => {
            setValueTwo(valueTwo + 2)
          }}
        />
      </div>
      <div>
        <Button 
          inner="-"
          onClick={() => {
            setValueThree(valueThree - 3)
          }}
        />
        <Thingy>{valueThree}</Thingy>
        <Button 
          inner="+"
          onClick={() => {
            setValueThree(valueThree + 3)
          }}
        />
      </div>
    </div>
  )
}

export { Example }
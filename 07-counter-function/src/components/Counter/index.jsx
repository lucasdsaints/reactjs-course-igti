import React from 'react'

import style from './Counter.module.css';
import IncrementButton from './IncementButton'
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';
import { useState } from 'react';

export default function Counter(props) {
  const [currentCounter, setCurrentCounter] = useState(2);
  const [steps, setSteps] = useState(0);

  const handleClick = (clickType) => {
    setCurrentCounter(
      (clickType === '+') ? currentCounter + 1 : currentCounter - 1
    );

    setSteps(steps + 1);
  }

  return (
    <div className={style.counterContainer}>
      <DecrementButton onDecrement={handleClick} />
      <Value value={currentCounter} />
      <IncrementButton onIncrement={handleClick} />
      <Steps value={steps} />
    </div>
  );
}

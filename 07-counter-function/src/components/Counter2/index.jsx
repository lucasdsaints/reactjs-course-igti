import React from 'react';

import style from './Counter.module.css';
import IncrementButton from './IncementButton'
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default function Counter2(props) {
  const { countValue, currentStep } = props;

  const handleClick = (value) => {
    props.onCount(value);
  }

  return (
    <div className={style.counterContainer}>
      <DecrementButton onDecrement={handleClick}/>
      <Value value={countValue}/>
      <IncrementButton onIncrement={handleClick}/>
      <Steps value={currentStep}/>
    </div>
  );
}

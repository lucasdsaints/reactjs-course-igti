import React, { Component } from 'react'

import style from './Counter.module.css';
import IncrementButton from './IncementButton'
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter2 extends Component {

  handleClick = (value) => {
    this.props.onCount(value);
  }

  render() {
    const { countValue, currentStep } = this.props;
    return (
      <div className={style.counterContainer}>
        <DecrementButton onDecrement={this.handleClick}/>
        <Value value={countValue}/>
        <IncrementButton onIncrement={this.handleClick}/>
        <Steps value={currentStep}/>
      </div>
    );
  }
}

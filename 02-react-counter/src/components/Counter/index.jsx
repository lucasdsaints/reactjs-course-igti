import React, { Component } from 'react'

import style from './Counter.module.css';
import IncrementButton from './IncementButton'
import DecrementButton from './DecrementButton';
import Value from './Value';
import Steps from './Steps';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 2,
      steps: 0,
    }
  }

  handleClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    this.setState({
      currentCounter: (clickType === '+') ?
        currentCounter + 1 : currentCounter - 1,
      steps: steps + 1
    });
  }

  render() {
    const { currentCounter, steps } = this.state;

    return (
      <div className={style.counterContainer}>
        <DecrementButton onDecrement={this.handleClick}/>
        <Value value={currentCounter}/>
        <IncrementButton onIncrement={this.handleClick}/>
        <Steps value={steps}/>
      </div>
    );
  }
}

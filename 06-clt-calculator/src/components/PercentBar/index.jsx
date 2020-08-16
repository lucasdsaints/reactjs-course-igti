import React, { Component } from 'react'

import './styles.css';

export default class PercentBar extends Component {

  calcPercent(value) {
    const { baseINSS } = this.props.salary;
    return 100*value/baseINSS
  }

  render() {
    const { discountINSS, discountIRPF, netSalary } = this.props.salary;

    return (
      <div className="percent-bar">
        <div
          style={{width: `${this.calcPercent(discountINSS)}%`}}
          className="inss-discount"></div>
        <div
        style={{width: `${this.calcPercent(discountIRPF)}%`}}
          className="irpf-discount"></div>
        <div
          style={{width: `${this.calcPercent(netSalary)}%`}}
          className="liquid-salary"></div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { formatToMoney } from '../../helpers/numbers';

import './styles.css';

export default class CalculationResults extends Component {

  formatValueWithPercent(value) {
    const { baseINSS } = this.props.salary;

    const percetage = value * 100 / baseINSS;
    return `${formatToMoney(value)} (${percetage.toFixed(2)}%)`;
  }

  render() {
    const { 
      baseINSS, baseIRPF, discountINSS, discountIRPF, netSalary
    } = this.props.salary;

    return (
      <div className="results-container">
        <div className="row">
          <div className="col s3">
            <label htmlFor="inssBase">Base INSS</label>
            <input
              value={ formatToMoney(baseINSS) }
              type="text"
              readOnly
              id="inssBase"/>
          </div>
          <div className="col s3">
            <label htmlFor="inssDiscount">Desconto INSS</label>
            <input
              className="inss-discount"
              value={ this.formatValueWithPercent(discountINSS) }
              type="text"
              readOnly
              id="inssDiscount"/>
          </div>
          <div className="col s3">
            <label htmlFor="irpfBase">Base IRPF</label>
            <input
              value={ formatToMoney(baseIRPF) }
              type="text"
              readOnly
              id="irpfBase"/>
          </div>
          <div className="col s3">
            <label htmlFor="irpfDiscount">Desconto IRPF</label>
            <input
              className="irpf-discount"
              value={ this.formatValueWithPercent(discountIRPF) }
              type="text"
              readOnly
              id="irpfDiscount"/>
          </div>
        </div>
        <div className="row">
          <div className="col s3">
            <label htmlFor="liquid">Salário Líquido</label>
            <input
              className="liquid-salary"
              value={ this.formatValueWithPercent(netSalary) }
              type="text"
              readOnly
              id="liquid"/>
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import CalculationResults from './components/CalculationResults';
import { calculateSalaryFrom } from './helpers/salary';
import PercentBar from './components/PercentBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salary: 1045,
      calculatedSalary: calculateSalaryFrom(1045)
    };
  }

  handleChangeSalary = (event) => {
    const value = event.target.value;

    this.setState({
      salary: value,
      calculatedSalary: calculateSalaryFrom(value)
    });
  }

  render() {
    const { calculatedSalary, salary } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h1>Calculadora CLT</h1>
          </div>
          <div className="col s12">
            <label htmlFor="salary">Salário Bruto</label>
            <input
              min="1045"
              value={ salary }
              onChange={ this.handleChangeSalary }
              type="number"
              id="salary"/>
          </div>
          <div className="col s12">
            <CalculationResults salary={ calculatedSalary }/>
          </div>
          <div className="col s12">
            <PercentBar salary={ calculatedSalary }/>
          </div>
        </div>
      </div>
    );
  }
}

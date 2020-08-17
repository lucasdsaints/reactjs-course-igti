import React, { Component } from 'react';

import Countries from './components/Countries';
import Headers from './components/Headers';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filter: '',
      filteredPopulation: 0
    };
  }

  async componentDidMount() {
    const res = await fetch('http://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      };
    });

    const filteredPopulation = this.calculateTotalPopulation(allCountries);

    this.setState({
      allCountries,
      filteredCountries: allCountries,
      filteredPopulation
    });
  }

  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText
    });

    const filterLower = newText.toLowerCase();

    const checkIfMatchFilter = (country) => country.filterName.includes(filterLower);
    const filteredCountries = this.state.allCountries.filter(checkIfMatchFilter);

    const totalPopulation = this.calculateTotalPopulation(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation: totalPopulation
    });
  }

  calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((total, country) => {
      return total + country.population;
    }, 0);
    return totalPopulation;
  }

  render() {
    const { filteredCountries, filter, filteredPopulation } = this.state;
    return(
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Headers
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopulation}
        />

        <Countries countries={ filteredCountries }/>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}
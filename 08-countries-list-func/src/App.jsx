import React, { useEffect, useState } from 'react';

import Countries from './components/Countries';
import Headers from './components/Headers';

export default function App(props) {

  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setfilteredCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredPopulation, setFilteredPopulation] = useState(0);

  useEffect(() => {
    const loadCountries = async () => {
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
  
      const filteredPopulation = calculateTotalPopulation(allCountries);
  
      setAllCountries(allCountries);
      setfilteredCountries(allCountries);
      setFilteredPopulation(filteredPopulation);
    }

    loadCountries();
  }, []);

  const handleChangeFilter = (newText) => {
    setFilter(newText);

    const filterLower = newText.toLowerCase();

    const checkIfMatchFilter = (country) => country.filterName.includes(filterLower);
    const filteredCountries = allCountries.filter(checkIfMatchFilter);

    const totalPopulation = calculateTotalPopulation(filteredCountries);

    setfilteredCountries(filteredCountries);
    setFilteredPopulation(totalPopulation);
  }

  const calculateTotalPopulation = (countries) => {
    const totalPopulation = countries.reduce((total, country) => {
      return total + country.population;
    }, 0);
    return totalPopulation;
  }

  return(
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Headers
        filter={filter}
        onChangeFilter={handleChangeFilter}
        countryCount={filteredCountries.length}
        totalPopulation={filteredPopulation}
      />

      <Countries countries={ filteredCountries }/>
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: 'center'
  }
}
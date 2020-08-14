import React, { Component } from 'react'
import Country from './Country';

import styles from './styles.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;

    return (
      <div className={styles.border}>
        <ul className={styles.flexList}>
          { countries.map(country => {
            return <Country key={country.id} country={country}/>;
          }) }
        </ul>
      </div>
    )
  }
}

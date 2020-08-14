import React, { Component } from 'react'

import styles from '../styles.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag } = country;
    return (
      <div className={`${styles.flexItem} ${styles.border}`}>
        <img src={flag} alt={name}/>
        {name}
      </div>
    )
  }
}

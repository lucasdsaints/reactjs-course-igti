import React from 'react'

import styles from '../styles.module.css';

export default function Country({ country }) {
  const { name, flag } = country;

  return (
    <div className={`${styles.flexItem} ${styles.border}`}>
      <img src={flag} alt={name}/>
      {name}
    </div>
  );
}

import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';

import styles from './styles.module.css';

export default class Header extends Component {

  handleInputChange = (event) => {
    const { onChangeFilter } = this.props;
    onChangeFilter(event.target.value);
  }

  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div className={styles.flexRow}>
        <input
          placeholder="Digite para pesquisar"
          type="text"
          value={filter}
          onChange={this.handleInputChange}
        /> |

        <span className={styles.countryNumber}>
          Países: <strong>{countryCount}</strong>
        </span> |

        <span className={styles.countryPopulation}>
          População: <strong>{formatNumber(totalPopulation)}</strong>
        </span>
      </div>
    )
  }
}
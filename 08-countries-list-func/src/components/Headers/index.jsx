import React from 'react'
import { formatNumber } from '../../helpers/formatHelpers';

import styles from './styles.module.css';

export default function Header(props) {
  const { filter, countryCount, totalPopulation, onChangeFilter } = props;

  const handleInputChange = (event) => {
    onChangeFilter(event.target.value);
  }

  return (
    <div className={styles.flexRow}>
      <input
        placeholder="Digite para pesquisar"
        type="text"
        value={filter}
        onChange={handleInputChange}
      /> |

      <span className={styles.countryNumber}>
        Países: <strong>{countryCount}</strong>
      </span> |

      <span className={styles.countryPopulation}>
        População: <strong>{formatNumber(totalPopulation)}</strong>
      </span>
    </div>
  );
}
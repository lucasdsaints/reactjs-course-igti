import React, { useState } from 'react';

import { getNewTimestamp } from './helpers/dateTimeHelpers';
import { useEffect } from 'react';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimestamp());

    setClickArray(newClickArray);
  }

  return (
    <div>
        <h1>
          React e Class Components
        </h1>

        <button onClick={handleClick}>Clique aqui</button>

        <ul>
          {clickArray.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
  );
}

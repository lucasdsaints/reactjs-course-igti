import React from 'react'

import style from './Counter.module.css';

export default function Steps({ value }) {
  return (
    <span className={style.counterValue}>({ value })</span>
  );
}

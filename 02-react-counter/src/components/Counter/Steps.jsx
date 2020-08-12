import React, { Component } from 'react'

import style from './Counter.module.css';

export default class Steps extends Component {
  render() {
    return (
      <span className={style.counterValue}>({this.props.value})</span>
    )
  }
}

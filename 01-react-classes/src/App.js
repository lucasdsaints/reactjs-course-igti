import React, { Component } from 'react';

import { getNewTimestamp } from './helpers/dateTimeHelpers';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: []
    }
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getNewTimestamp());

    this.setState({ clickArray: newClickArray });
  }

  componentWillUpdate() {
    document.title = this.state.clickArray.length.toString();
  }

  render() {
    const { clickArray } = this.state;

    return (
      <div>
        <h1>
          React e Class Components
        </h1>

        <button onClick={this.handleClick}>Clique aqui</button>

        <ul>
          {clickArray.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}

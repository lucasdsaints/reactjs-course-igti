import React, { Component } from 'react'

import styles from './Users.module.css';

export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      secondsVisible: 0
    };

    this.interval = null;
  }

  componentDidMount() {    
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({
        secondsVisible: secondsVisible + 1
      });
    },1000);
  }

  render() {
    const { users } =  this.props;
    const { secondsVisible } = this.state;

    return (
      <div>
        <p>Componente Users visível por { secondsVisible } segundos</p>

        <ul className={ styles.list }>
          {users.map(user => {
            const { login, name, picture } = user;

            return (
              <li className={styles.listItem} key={ login.uuid }>
                <img src={picture.large} alt={name}/>
                <span>{ name.first }</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
}


import React, { Component } from 'react';
import Users from './components/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false
    };
  }

  async componentDidMount() {
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );

    const json = await res.json();

    this.setState({
      users: json.results
    });
  }
  
  handleShowUsers = (event) => {
    this.setState({
      showUsers: event.target.checked
    });
  }

  render() {
    const { showUsers, users } = this.state;
    return (
      <div>
        <div className="switch">
          <label>
            Mostrar Usuários:
            <input type="checkbox" onChange={this.handleShowUsers}/>
            <span className="lever"></span>
          </label>
        </div>
        <hr />
        <div>
          <ul><li>teste</li></ul>
          { showUsers && <Users users={ users }/> }
        </div>
      </div>
    );
  }
}

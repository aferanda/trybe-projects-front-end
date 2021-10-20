import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const { name } = await getUser();

    this.setState({
      name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : <h2 data-testid="header-user-name">{ name }</h2>}
      </header>
    );
  }
}

export default Header;

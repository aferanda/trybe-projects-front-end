import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      minLength: 3,
      loading: false,
      search: false,
    };

    this.didMount = false;
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentWillUnmount() {
    this.didMount = false;
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async onClickButton(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    if (this.didMount) {
      this.setState({ loading: false, search: true });
    }
  }

  render() {
    const { name, minLength, loading, search } = this.state;
    return (
      <div data-testid="page-login" className="container page-login">
        { loading && <Loading /> }
        { search && <Redirect to="/search" /> }
        <form className="container ctn-login">
          <p className="title">Music Store</p>
          <label htmlFor="login-name-input">
            <span>Nome:</span>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={ name }
              onChange={ this.onInputChange }
              placeholder="Nome"
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            disabled={ name.length < minLength }
            onClick={ this.onClickButton }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

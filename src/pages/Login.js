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
      <div data-testid="page-login">
        { loading && <Loading /> }
        { search && <Redirect to="/search" /> }
        <form>
          <label htmlFor="login-name-input">
            Nome:
            <input
              type="text"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
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

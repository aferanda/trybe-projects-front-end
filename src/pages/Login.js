import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionUserEmail } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { history, setUserEmail } = this.props;
    const { email } = this.state;
    setUserEmail(email);
    history.push('./carteira');
  }

  render() {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    const regexEmail = /\S+@\S+\.\S+/; // Fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const isDisabled = regexEmail.test(email) && password.length >= MIN_LENGTH;

    return (
      <div>
        <form onSubmit={ this.handleClick }>
          <label htmlFor="input-email">
            <input
              type="email"
              id="input-email"
              placeholder="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="input-password">
            <input
              type="password"
              id="input-password"
              placeholder="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ !isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  setUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (state) => dispatch(actionUserEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);

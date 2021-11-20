import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends Component {
  constructor() {
    super();

    this.state = {
      currencies: 'BRL',
      expenses: 0,
    };
  }

  render() {
    const { getEmail } = this.props;
    const { currencies, expenses } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            {`Email: ${getEmail}`}
          </p>
          <p data-testid="total-field">
            { `Despesa Total: R$ ${expenses} ` }
            <span data-testid="header-currency-field">{ currencies }</span>
          </p>
        </header>
        <Form />
      </div>
    );
  }
}

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

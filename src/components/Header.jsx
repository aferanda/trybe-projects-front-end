import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { getEmail, getExpenses } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {`Email: ${getEmail}`}
        </p>
        <p data-testid="total-field">
          { 'Despesa Total: R$ ' }
          { parseFloat(getExpenses.reduce((acc, cur) => (
            acc + (cur.value * cur.exchangeRates[cur.currency].ask)
          ), 0)).toFixed(2) }
          <span data-testid="header-currency-field"> BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

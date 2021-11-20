import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { getEmail } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          {`Email: ${getEmail}`}
        </p>
        <p data-testid="total-field">
          { 'Despesa Total: R$ 0 ' }
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  getEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);

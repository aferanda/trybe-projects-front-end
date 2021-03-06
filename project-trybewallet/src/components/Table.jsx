import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionDeleteClick } from '../actions';

class Table extends Component {
  render() {
    const { getExpenses, deleteExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { getExpenses
            .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ (exchangeRates[currency].name).split('/')[0] }</td>
                <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                <td>{ parseFloat(value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpense(id) }
                  >
                    X
                  </button>
                </td>
              </tr>))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  getExpenses: [],
};

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(actionDeleteClick(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

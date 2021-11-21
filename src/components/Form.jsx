import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpenses, fetchCurrencies } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { getCurrencies, addExpenses, addCurrencies } = this.props;
    getCurrencies();
    addExpenses({ ...this.state, exchangeRates: addCurrencies });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          type="number"
          name="value"
          value={ value }
          onChange={ this.handleChange }
          data-testid="value-input"
        />
      </label>
    );
  }

  currencyInput() {
    const { currency } = this.state;
    const { addCurrencies } = this.props;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          onChange={ this.handleChange }
          name="currency"
          value={ currency }
          data-testid="currency-input"
        >
          { Object.keys(addCurrencies)
            .map((elem) => (
              <option key={ elem } data-testid={ elem }>{elem}</option>)) }
        </select>
      </label>
    );
  }

  methodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        Método de pagamento:
        <select
          onChange={ this.handleChange }
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de cébito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  tagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag-input">
        Tag:
        <select
          onChange={ this.handleChange }
          name="tag"
          value={ tag }
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  descriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          data-testid="description-input"
        />
      </label>
    );
  }

  render() {
    return (
      <form onSubmit={ this.handleClick }>
        { this.valueInput() }
        { this.currencyInput() }
        { this.methodInput() }
        { this.tagInput() }
        { this.descriptionInput() }
        <button type="submit">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addCurrencies: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  addExpenses: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  addCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpenses: (state) => dispatch(getExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

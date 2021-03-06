import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionExpenses, actionFetchWithThunk } from '../actions';

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

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { setCurrencies, setExpenses, allCurrencies } = this.props;
    setCurrencies();
    setExpenses({ ...this.state, exchangeRates: allCurrencies });
    this.setState({
      value: '',
      description: '',
    });
  }

  valueInput() {
    const { value } = this.state;
    return (
      <label htmlFor="value-input">
        Valor:
        <input
          id="value-input"
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
    const { keysCurrencies } = this.props;
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          id="currency-input"
          data-testid="currency-input"
          onChange={ this.handleChange }
          name="currency"
          value={ currency }
        >
          { keysCurrencies
            .map((elem) => (
              <option key={ elem } value={ elem } data-testid={ elem }>{elem}</option>)) }
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
          id="method-input"
          onChange={ this.handleChange }
          name="method"
          value={ method }
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
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
          id="tag-input"
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
          id="description-input"
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
  setExpenses: PropTypes.func.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  allCurrencies: PropTypes.objectOf(PropTypes.object),
  keysCurrencies: PropTypes.arrayOf(PropTypes.string),
};

Form.defaultProps = {
  allCurrencies: {},
  keysCurrencies: [],
};

const mapStateToProps = (state) => ({
  keysCurrencies: state.wallet.currencies,
  allCurrencies: state.wallet.allCurrencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(actionFetchWithThunk()),
  setExpenses: (state) => dispatch(actionExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

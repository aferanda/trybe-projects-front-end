import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputWallet } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
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
    const { getWallet } = this.props;
    e.preventDefault();
    getWallet(this.state);
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
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select
          onChange={ this.handleChange }
          name="currency"
          value={ currency }
          data-testid="currency-input"
        >
          <option value="BRL">BRL</option>
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
  getWallet: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getWallet: (state) => dispatch(inputWallet(state)),
});

export default connect(null, mapDispatchToProps)(Form);

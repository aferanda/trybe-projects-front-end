import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select id="currency-input" data-testid="currency-input">
            <option value="BRL">BRL</option>
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select name="" id="method-input" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de cébito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select id="tag-input" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
          />
        </label>
        <button type="button">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

export default Form;

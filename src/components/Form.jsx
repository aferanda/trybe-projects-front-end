import React, { Component } from 'react';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <section className="section-form">
        <h2 className="form-title">Adicionar nova carta</h2>
        <form className="form">
          <label htmlFor="name-input">
            Nome
            <input
              type="text"
              name="cardName"
              onChange={ onInputChange }
              value={ cardName }
              data-testid="name-input"
              required
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <textarea
              name="cardDescription"
              cols="20"
              rows="5"
              value={ cardDescription }
              onChange={ onInputChange }
              data-testid="description-input"
              required
            />
          </label>
          <label htmlFor="attr1-input">
            Attr01
            <input
              type="number"
              name="cardAttr1"
              id=""
              min="0"
              max="90"
              value={ cardAttr1 }
              onChange={ onInputChange }
              data-testid="attr1-input"
            />
          </label>
          <label htmlFor="attr2-input">
            Attr02
            <input
              type="number"
              name="cardAttr2"
              id=""
              min="0"
              max="90"
              value={ cardAttr2 }
              onChange={ onInputChange }
              data-testid="attr2-input"
            />
          </label>
          <label htmlFor="attr3-input">
            Attr03
            <input
              type="number"
              name="cardAttr3"
              id=""
              min="0"
              max="90"
              value={ cardAttr3 }
              onChange={ onInputChange }
              data-testid="attr3-input"
            />
          </label>
          <label htmlFor="image-input">
            Imagem
            <input
              type="text"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
              data-testid="image-input"
              required
            />
          </label>
          <label htmlFor="rare-input">
            Raridade
            <select
              name="cardRare"
              id=""
              value={ cardRare }
              onChange={ onInputChange }
              data-testid="rare-input"
              required
            >
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="trunfo-input">
            <input
              type="checkbox"
              name="cardTrunfo"
              id="trunfo-input"
              checked={ cardTrunfo }
              onChange={ onInputChange }
              data-testid="trunfo-input"
            />
            Super Trybe Trunfo
          </label>
          <button
            type="submit"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            data-testid="save-button"
          >
            Salvar
          </button>
        </form>
      </section>
    );
  }
}

export default Form;

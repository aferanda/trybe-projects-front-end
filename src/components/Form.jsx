import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form className="form">
        <h2 className="form-title">Adicionar nova carta</h2>
        <label htmlFor="name-input">
          Nome
          <input type="text" data-testid="name-input" />
        </label>
        <label htmlFor="description-input">
          Descrição
          <textarea
            name=""
            id=""
            cols="20"
            rows="5"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="attr1-input">
          Attr01
          <input type="number" name="" id="" data-testid="attr1-input" />
        </label>
        <label htmlFor="attr2-input">
          Attr02
          <input type="number" name="" id="" data-testid="attr2-input" />
        </label>
        <label htmlFor="attr3-input">
          Attr03
          <input type="number" name="" id="" data-testid="attr3-input" />
        </label>
        <label htmlFor="image-input">
          Imagem
          <input type="text" src="" alt="" data-testid="image-input" />
        </label>
        <label htmlFor="rare-input">
          Raridade
          <select
            name=""
            id=""
            defaultValue=""
            data-testid="rare-input"
            placeholder="Selecione"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          <input type="checkbox" name="" id="trunfo-input" data-testid="trunfo-input" />
          Super Trybe Trunfo
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;

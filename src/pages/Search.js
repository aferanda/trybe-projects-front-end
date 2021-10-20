import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      minLength: 2,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, minLength } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            <input
              name="name"
              value={ name }
              onChange={ this.onInputChange }
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            disabled={ name.length < minLength }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

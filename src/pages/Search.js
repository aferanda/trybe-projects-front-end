import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: '',
      artistSearch: '',
      minLength: 2,
      loading: false,
      resolve: false,
      albums: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async onClickButton(artistName) {
    const { artist } = this.state;
    this.setState({
      loading: true,
      artistSearch: artist,
    });
    const api = await searchAlbumsAPI(artistName);
    this.setState({
      artist: '',
      albums: api,
      loading: false,
      resolve: true,
    });
  }

  renderAlbums() {
    const { albums, resolve, artistSearch } = this.state;
    if (resolve && albums.length === 0) {
      return <h2>Nenhum álbum foi encontrado</h2>;
    }
    if (resolve) {
      return (
        <div className="result-albums">
          <h2>{`Resultado de álbuns de: ${artistSearch}`}</h2>
          <section className="albums">
            { albums.map((album, index) => (
              <div key={ album.collectionId } className="album">
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  { `Album ${index + 1}` }
                </Link>
              </div>
            ))}
          </section>
        </div>
      );
    }
  }

  render() {
    const { artist, minLength, loading } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        { loading ? <Loading /> : (
          <>
            <Header />
            <form className="ctn-search">
              <label htmlFor="search-artist-input">
                <input
                  name="artist"
                  value={ artist }
                  onChange={ this.onInputChange }
                  placeholder="Nome do Artista"
                  data-testid="search-artist-input"
                />
              </label>
              <button
                type="button"
                onClick={ () => this.onClickButton(artist) }
                disabled={ artist.length < minLength }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
              {this.renderAlbums()}
            </form>
          </>
        )}
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: [],
      resolve: false,
      loading: false,
      favorites: [],
    };

    this.getInfoMusics = this.getInfoMusics.bind(this);
    this.verifyCheck = this.verifyCheck.bind(this);
  }

  componentDidMount() {
    this.getMusicsApi();
    this.getFavoriteSongsApi();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { favorites } = this.state;
    if (prevState.favorites !== favorites) {
      this.verifyCheck();
    }
  }

  async getMusicsApi() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      album: musics,
      resolve: true,
    });
  }

  async getFavoriteSongsApi() {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorites: favoriteSongs,
      loading: false,
    });
  }

  getInfoMusics() {
    const { album, resolve } = this.state;
    if (resolve) {
      const { artworkUrl100, artistName, collectionName } = album[0];
      return (
        <div className="collection">
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3 data-testid="album-name">{collectionName}</h3>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
  }

  verifyCheck() {
    const { favorites } = this.state;
    favorites.forEach(({ trackId }) => {
      const favoriteMusic = document.getElementById(trackId);
      if (favoriteMusic) {
        favoriteMusic.checked = true;
      }
    });
  }

  render() {
    const { album, loading } = this.state;
    return (
      <div data-testid="page-album">
        { loading && <Loading />}
        <Header />
        <div className="ctn-audios">
          { this.getInfoMusics() }
          { album.slice(1).map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: [],
      resolve: false,
    };

    this.getMusicsApi = this.getMusicsApi.bind(this);
    this.getInfoMusics = this.getInfoMusics.bind(this);
  }

  componentDidMount() {
    this.getMusicsApi();
  }

  async getMusicsApi() {
    const { match: { params: { id } } } = this.props;
    const api = await getMusics(id);
    this.setState({
      album: api,
      resolve: true,
    });
  }

  getInfoMusics() {
    const { album, resolve } = this.state;
    if (resolve) {
      const { artworkUrl100, artistName, collectionName } = album[0];
      return (
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h3 data-testid="album-name">{collectionName}</h3>
          <p data-testid="artist-name">{artistName}</p>
        </div>
      );
    }
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { this.getInfoMusics() }
        { album.slice(1).map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />
        ))}
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

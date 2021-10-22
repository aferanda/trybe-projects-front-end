import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.addSongFav = this.addSongFav.bind(this);
    this.removeSongFav = this.removeSongFav.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  handleFavorites(checked) {
    return checked ? this.addSongFav() : this.removeSongFav();
  }

  async addSongFav() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(music);
    this.setState({
      loading: false,
    });
  }

  async removeSongFav() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });
    await removeSong(music);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { music: { trackId, trackName, previewUrl } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        <div>
          <h4>{ trackName }</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              onChange={ ({ target }) => {
                const { checked } = target;
                this.handleFavorites(checked);
              } }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
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
      check,
      deleteCard,
    } = this.props;

    return (
      <div className="card">
        <div className="card-box">
          <div className="card-header">
            <h3 data-testid="name-card">{ cardName }</h3>
          </div>
          <img
            data-testid="image-card"
            src={ cardImage }
            alt={ cardName }
            className="image-card"
          />
          <p
            className="description"
            data-testid="description-card"
          >
            { cardDescription }
          </p>
          <div className="card-attr">
            <span>Attr01</span>
            <p data-testid="attr1-card">{ cardAttr1 }</p>
            <span>Attr02</span>
            <p data-testid="attr2-card">{ cardAttr2 }</p>
            <span>Attr03</span>
            <p data-testid="attr3-card">{ cardAttr3 }</p>
          </div>
          <div className="card-rare-trunfo">
            <p data-testid="rare-card">{ cardRare }</p>
            { cardTrunfo
              ? (
                <p
                  id="trunfo-input"
                  className="card-trunfo"
                  data-testid="trunfo-card"
                >
                  Super Trunfo
                </p>)
              : cardTrunfo}
          </div>
          { check
              && (
                <button
                  id={ cardName }
                  type="button"
                  onClick={ deleteCard }
                  data-testid="delete-button"
                >
                  Excluir
                </button>
              )}
        </div>
      </div>
    );
  }
}

Card.propTypes = PropTypes.shape({
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.number,
  cardAttr2: PropTypes.number,
  cardAttr3: PropTypes.number,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}).isRequired;

export default Card;

import React from 'react';
import './App.css';
// import PropType from 'prop-types';
import Form from './components/Form';
import Card from './components/Card';

const defaultState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
};
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...defaultState,
      cardList: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(({ [name]: value }), () => {
      const {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      } = this.state;

      const required = [cardName, cardDescription, cardImage, cardRare]
        .every((all) => all !== '');
      const sumAtrrs = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);

      const atrrsValues = {
        maxSumPoints: 210,
        maxPoint: 90,
        minPoint: 0,
      };

      const checkSum = sumAtrrs <= atrrsValues.maxSumPoints;

      const checkAtrrs = [cardAttr1, cardAttr2, cardAttr3]
        .some((atrr) => atrr > atrrsValues.maxPoint || atrr < atrrsValues.minPoint);

      if (required && checkSum && !checkAtrrs) {
        this.setState({ isSaveButtonDisabled: false });
      } else {
        this.setState({ isSaveButtonDisabled: true });
      }
    });
  }

  onSaveButtonClick(event) {
    event.preventDefault();
    const { cardList } = this.state;
    cardList.push({ ...this.state });

    this.setState({ ...defaultState });
  }

  render() {
    return (
      <div className="App">
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;

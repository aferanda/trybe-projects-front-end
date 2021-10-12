import React from 'react';
import './App.css';
// import PropType from 'prop-types';
import Form from './components/Form';
import Card from './components/Card';

const defaultState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: '',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
};
class App extends React.Component {
  constructor() {
    super();

    this.state = { ...defaultState };

    this.onInputChange = this.onInputChange.bind(this);
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

  render() {
    return (
      <div className="App">
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
        />
        <Card { ...this.state } />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;

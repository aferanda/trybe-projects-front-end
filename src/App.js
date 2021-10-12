import React from 'react';
import './App.css';
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
    this.renderAllCards = this.renderAllCards.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
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
    const { cardList, cardTrunfo } = this.state;
    cardList.push({ ...this.state });

    if (cardTrunfo === true) {
      this.setState({
        ...defaultState,
        hasTrunfo: true,
        cardTrunfo: true,
      });
    } else {
      this.setState({
        ...defaultState,
        hasTrunfo: false,
      });
    }
  }

  deleteCard({ target }) {
    const { cardList } = this.state;
    const { id } = target.previousSibling;

    this.setState({
      cardList: cardList.filter((card) => card.cardName !== target.id),
    });

    if (id) {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  renderAllCards() {
    const { cardList } = this.state;
    return cardList
      .map((card) => (<Card
        key={ card.cardName }
        { ...card }
        check
        deleteCard={ this.deleteCard }
      />));
  }

  render() {
    return (
      <div className="App">
        <section className="section-form">
          <h2 className="form-title">Adicionar nova carta</h2>
          <Form
            { ...this.state }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
        </section>
        <section className="section-card">
          <h2 className="card-title">Pré-visualização</h2>
          <Card
            { ...this.state }
          />
        </section>
        <section className="section-all-cards">
          <h2>Todas as cartas</h2>
          { this.renderAllCards() }
        </section>
      </div>
    );
  }
}

export default App;

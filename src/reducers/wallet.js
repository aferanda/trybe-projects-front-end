import { DELETE_CLICK, GET_CURRENCIES, GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  allCurrencies: {},
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state,
      currencies: action.keysCurrencies,
      allCurrencies: action.allCurrencies,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.expenses.length },
      ],
    };
  case DELETE_CLICK:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  default:
    return state;
  }
};

export default wallet;

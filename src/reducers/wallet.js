// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { INPUT_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INPUT_WALLET:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.payload, id: state.expenses.length },
      ],
    };
  default:
    return state;
  }
};

export default wallet;

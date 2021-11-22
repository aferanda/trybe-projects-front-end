import fetchAPI from '../services/requestAPI';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const getCurrencies = (allCurrencies, keysCurrencies) => ({
  type: GET_CURRENCIES,
  allCurrencies,
  keysCurrencies,
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const allCurrencies = await fetchAPI();
      delete allCurrencies.USDT;
      const keysCurrencies = Object.keys(allCurrencies);
      dispatch(getCurrencies(allCurrencies, keysCurrencies));
    } catch (error) {
      console.error(error);
    }
  };
}

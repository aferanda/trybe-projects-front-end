import fetchAPI from '../services/requestAPI';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const getExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    // dispatch(getCurrencies());
    try {
      const currencies = await fetchAPI();
      // const keysCurrencies = Object.keys(currencies).filter((key) => key !== 'USDT');
      dispatch(getCurrencies(currencies));
    } catch (error) {
      console.error(error);
    }
  };
}

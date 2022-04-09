import fetchAPI from '../services/requestAPI';

export const INPUT_EMAIL = 'INPUT_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const DELETE_CLICK = 'DELETE_CLICK';

export const actionUserEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const actionCurrencies = (allCurrencies, keysCurrencies) => ({
  type: GET_CURRENCIES,
  allCurrencies,
  keysCurrencies,
});

export const actionExpenses = (payload) => ({
  type: GET_EXPENSES,
  payload,
});

export const actionDeleteClick = (payload) => ({
  type: DELETE_CLICK,
  payload,
});

export function actionFetchWithThunk() {
  return async (dispatch) => {
    try {
      const allCurrencies = await fetchAPI();
      delete allCurrencies.USDT;
      const keysCurrencies = Object.keys(allCurrencies);
      dispatch(actionCurrencies(allCurrencies, keysCurrencies));
    } catch (error) {
      console.error(error);
    }
  };
}

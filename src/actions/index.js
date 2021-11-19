// Coloque aqui suas actions
export const INPUT_EMAIL = 'INPUT_EMAIL';
export const WALLET = 'WALLET';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const wallet = (payload) => ({
  type: WALLET,
  payload,
});

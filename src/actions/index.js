// Coloque aqui suas actions
export const INPUT_EMAIL = 'INPUT_EMAIL';
export const INPUT_WALLET = 'INPUT_WALLET';

export const inputEmail = (payload) => ({
  type: INPUT_EMAIL,
  payload,
});

export const inputWallet = (payload) => ({
  type: INPUT_WALLET,
  payload,
});

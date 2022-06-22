// Coloque aqui suas actions
export const USER_EMAIL = 'USER_EMAIL';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const saveUserEmail = (payload) => ({
  type: USER_EMAIL,
  payload,
});

const saveCurrencies = (json) => ({
  type: FETCH_CURRENCIES,
  payload: json,
});

export const fetchCurrencies = () => (
  // async (dispatch) => {
  //   const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const response = await data.json();
  //   dispatch(saveCurrencies(response));
  //   return response;
  // }
  (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(saveCurrencies(json)));
  }
);

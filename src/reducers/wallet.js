// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES } from '../store/actions';

const INITIAL_STATE = { currencies: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter(
        (coin) => coin !== 'USDT',
      ),
    };
  default:
    return state;
  }
};

export default wallet;

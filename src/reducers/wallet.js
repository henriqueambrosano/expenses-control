// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_CURRENCIES, SAVE_EXPENSE, DELETE_TASK } from '../store/actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter(
        (coin) => coin !== 'USDT',
      ),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length, ...action.payload }],
    };
  case DELETE_TASK:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.taskId),
    };
  default:
    return state;
  }
};

export default wallet;

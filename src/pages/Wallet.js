import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencies,
  saveExchangeRates,
  removeTask,
  actionEditTask,
  saveEditedTask,
} from '../store/actions/index';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  recordExpense = () => {
    const { saveExpense } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => {
        this.setState(() => ({ exchangeRates: json }));
      })
      .then(() => {
        saveExpense(this.state);
        this.setState({ value: '' });
      });
  };

  changeTask = (expense) => {
    const { editTask, expenses } = this.props;

    this.setState(expenses[expenses.indexOf(expense)]);
    editTask({ edit: true, idToEdit: expenses.indexOf(expense) });
  }

  render() {
    const {
      userEmail,
      currencies,
      expenses,
      deleteTask,
      editing,
      recordEditedTask,
    } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <h1> TrybeWallet </h1>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field">
          {!expenses ? 0 : expenses.reduce((acc, curr) => {
            acc += curr.value * curr.exchangeRates[curr.currency].ask;
            return acc;
          }, 0).toFixed(2)}
        </p>
        <p data-testid="header-currency-field"> BRL </p>
        <form>
          <input
            type="text"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="valor da despesa"
          />
          <input
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            placeholder="descrição da despesa"
          />
          <label htmlFor="coins">
            Moeda
            <select id="coins" name="currency" onChange={ this.handleChange }>
              {currencies.map((coin) => (
                <option key={ coin }>{coin}</option>
              ))}
            </select>
          </label>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          {editing
            ? (
              <button
                type="button"
                onClick={ () => recordEditedTask(this.state) }
              >
                Editar despesa
              </button>
            )
            : (
              <button type="button" onClick={ this.recordExpense }>
                Adicionar despesa
              </button>
            )}
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{(+expense.value).toFixed(2)}</td>
                <td>{(expense.exchangeRates[expense.currency].name).split('/')[0]}</td>
                <td>{(+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
                <td>
                  {(+expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.changeTask(expense) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteTask(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editing: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrencies()),
  saveExpense: (payload) => dispatch(saveExchangeRates(payload)),
  deleteTask: (expenseId) => dispatch(removeTask(expenseId)),
  editTask: (expenseId) => dispatch(actionEditTask(expenseId)),
  recordEditedTask: (expense) => dispatch(saveEditedTask(expense)),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  deleteTask: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  editTask: PropTypes.func.isRequired,
  recordEditedTask: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  editing: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

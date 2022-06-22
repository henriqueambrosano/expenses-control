import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../store/actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  render() {
    const { userEmail, currencies } = this.props;
    return (
      <div>
        <h1> TrybeWallet </h1>
        <p data-testid="email-field">{userEmail}</p>
        <p data-testid="total-field"> 0 </p>
        <p data-testid="header-currency-field"> BRL </p>
        <form>
          <input
            type="text"
            data-testid="value-input"
            placeholder="valor da despesa"
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="descrição da despesa"
          />
          <label htmlFor="coins">
            Moeda
            <select id="coins">
              {currencies.map((currency) => (
                <option key={ currency }>{currency}</option>
              ))}
            </select>
          </label>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <input
            type="text"
            data-testid="value-input"
            placeholder="valor da despesa"
          />
          <input
            type="text"
            data-testid="value-input"
            placeholder="valor da despesa"
          />
          <input
            type="text"
            data-testid="value-input"
            placeholder="valor da despesa"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  fetchCoins: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

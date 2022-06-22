import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserEmail } from '../store/actions/index';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    btnDisabled: true,
  };

  validateLogin = () => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, senha } = this.state;
    const validPassword = senha.length > '5';
    const validEmail = email.match(mailformat);
    if (validEmail && validPassword) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(() => ({
      [name]: value,
    }), this.validateLogin);
  };

  login = () => {
    const { saveUserData, history } = this.props;
    const { email } = this.state;
    saveUserData(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha, btnDisabled } = this.state;
    return (
      <div>
        <h1>Login Page</h1>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="E-mail"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="senha"
            value={ senha }
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button type="button" onClick={ this.login } disabled={ btnDisabled }>
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserData: (payload) => dispatch(saveUserEmail(payload)),
});

Login.propTypes = {
  saveUserData: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

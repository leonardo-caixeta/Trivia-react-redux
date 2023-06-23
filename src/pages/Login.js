import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAction, setNameAction } from '../redux/actions/index';

class Login extends Component {
  state = {
    email: '',
    userName: '',
    isDisabled: true,
  };

  validateLogin = () => {
    const { email, userName } = this.state;
    const isEmailValid = email.length > 0;
    const isUserNameValid = userName.length > 0;
    const isValid = isEmailValid && isUserNameValid;
    const isDisabled = !isValid;

    this.setState({
      isDisabled,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.validateLogin();
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const API_URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(API_URL);
    const { token } = await response.json();
    const { email, userName } = this.state;
    const { history, dispatch } = this.props;

    dispatch(setEmailAction(email));
    dispatch(setNameAction(userName));
    localStorage.setItem('token', token);
    history.push('/game');

    this.setState({
      email: '',
      userName: '',
    });
  };

  render() {
    const { isDisabled } = this.state;
    const { history } = this.props;

    return (
      <>
        <form onSubmit={ this.validateLogin }>
          <input
            type="email"
            name="email"
            placeholder="e-mail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

          <input
            type="text"
            name="userName"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />

          <button
            disabled={ isDisabled }
            type="submit"
            name="submit-btn"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
          >
            Play
          </button>

        </form>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

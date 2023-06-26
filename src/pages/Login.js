import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAction,
  setNameAction,
  setScoreAction,
  setassertionsAction } from '../redux/actions/index';

class Login extends Component {
  state = {
    userEmail: '',
    userName: '',
    isDisabled: true,
  };

  validateLogin = () => {
    const { userEmail, userName } = this.state;
    const isUserEmailValid = userEmail.length > 0;
    const isUserNameValid = userName.length > 0;
    const isLoginValid = isUserEmailValid && isUserNameValid;
    const isDisabled = !isLoginValid;

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
    const { userEmail, userName } = this.state;
    const { history, dispatch } = this.props;

    dispatch(setEmailAction(userEmail));
    dispatch(setNameAction(userName));
    dispatch(setassertionsAction(0));
    dispatch(setScoreAction(0));
    localStorage.setItem('token', token);
    history.push('/game');

    this.setState({
      userEmail: '',
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
            data-testid="input-gravatar-email"
            type="email"
            name="userEmail"
            placeholder="e-mail"
            onChange={ this.handleChange }
          />

          <input
            data-testid="input-player-name"
            type="text"
            name="userName"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />

          <button
            data-testid="btn-play"
            type="submit"
            name="submit-btn"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>

        </form>

        <button
          data-testid="btn-settings"
          type="button"
          onClick={ () => history.push('/settings') }
        >
          Settings
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

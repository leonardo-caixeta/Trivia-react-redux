import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  render() {
    const { isDisabled } = this.state;

    return (
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
        >
          Play
        </button>
      </form>
    );
  }
}

export default connect()(Login);

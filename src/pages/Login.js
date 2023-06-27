import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmailAction, setNameAction, resetPlayerAction } from '../redux/actions/index';
import { fetchTokenFromAPI } from '../services/triviaAPI';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    localStorage.removeItem('token');
    dispatch(resetPlayerAction());
  }

  validateLogin = () => {
    const { email, name } = this.state;
    const isEmailValid = email.length > 0;
    const isNameValid = name.length > 0;
    const isLoginValid = isEmailValid && isNameValid;
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

    const { email, name } = this.state;
    const { history, dispatch } = this.props;
    const token = await fetchTokenFromAPI();

    dispatch(setEmailAction(email));
    dispatch(setNameAction(name));
    localStorage.setItem('token', token);
    history.push('/game');

    this.setState({
      email: '',
      name: '',
    });
  };

  render() {
    const { isDisabled } = this.state;
    const { history } = this.props;

    return (
      <div>
        <form onSubmit={ this.validateLogin }>
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Type your email here..."
            onInput={ this.handleChange }
          />

          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            placeholder="Type your name here..."
            onInput={ this.handleChange }
          />

          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </form>

        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayAgainBtn extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button
            data-testid="btn-go-home"

          >
            Jogar novamente

          </button>
        </Link>
      </div>
    );
  }
}

PlayAgainBtn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

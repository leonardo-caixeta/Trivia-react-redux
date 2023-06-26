import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  handleRestart = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    const ASSERTION_DELIMITER = 3;

    return (
      <div>
        <Header />

        <p data-testid="feedback-total-score">
          {score}
        </p>

        <p data-testid="feedback-total-question">
          {assertions}
        </p>

        <p data-testid="feedback-text">
          {
            (assertions < ASSERTION_DELIMITER)
              ? 'Could be better...'
              : 'Well Done!'
          }
        </p>

        <button
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>

        <button
          data-testid="btn-play-again"
          onClick={ this.handleRestart }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { score, assertions } = player;
  return { score, assertions };
};

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

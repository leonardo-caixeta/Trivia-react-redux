import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.setPlayerInLocalStorage();
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  handleRestart = () => {
    const { history } = this.props;
    history.push('/');
  };

  setPlayerInLocalStorage = () => {
    const { name, score } = this.props;
    const oldPlayerScore = JSON.parse(localStorage.getItem('playerScore')) || [];
    const newPlayerScore = [
      ...oldPlayerScore,
      {
        name,
        score,
      }];

    localStorage.setItem('playerScore', JSON.stringify(newPlayerScore));
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
          Play again
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { name, score, assertions } = player;
  return { name, score, assertions };
};

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);

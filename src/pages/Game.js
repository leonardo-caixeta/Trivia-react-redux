import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
      localStorage.removeItem('token');
    } else {
      const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const RESPONSE_CODE = 3;
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.response_code === RESPONSE_CODE) {
        history.push('/');
        localStorage.removeItem('token');
      } else {
        this.setState(() => ({
          questions: data.results,
        }));
      }
    }
  };

  render() {
    const { questions, index } = this.state;
    const question = questions[index];
    const answers = (question)
      ? [...question.incorrect_answers, question.correct_answer]
      : [];

    const randomNumber = 0.5;
    const shuffle = answers.sort(() => Math.random() - randomNumber);

    return (
      <div className="game">
        <Header />

        {
          (question)
          && (
            <>
              <div className="question-category">
                <h1 data-testid="question-category">{question.category}</h1>
              </div>
              <div className="question">
                <h2 data-testid="question-text">{question.question}</h2>
              </div>

              {
                shuffle
                  .map((answer, answerIndex) => {
                    const testId = (answer === question.correct_answer)
                      ? 'correct-answer'
                      : `wrong-answer-${answerIndex}`;

                    return (
                      <div
                        data-testid="answer-options"
                        key={ answerIndex }
                      >
                        <button
                          data-testid={ testId }
                        >
                          {answer}
                        </button>
                      </div>
                    );
                  })
              }
            </>
          )
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);

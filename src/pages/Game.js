import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    shuffledAnswers: [],
    timerId: null,
    timerDuration: 0,
    questionIndex: 0,
    isAnswered: false,
  };

  componentDidMount() {
    this.fetchQuestions();
    this.handleTimer();
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    if (!token) {
      history.push('/');
    } else {
      const API_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const RESPONSE_CODE = 3;
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.response_code === RESPONSE_CODE) {
        localStorage.removeItem('token');
        history.push('/');
      } else {
        const questions = data.results;
        const question = questions[0];

        const answers = (question)
          ? [...question.incorrect_answers, question.correct_answer]
          : [];

        const RANDOM_INCREMENT = 0.5;
        const shuffledAnswers = answers.sort(() => Math.random() - RANDOM_INCREMENT);

        this.setState(() => ({
          questions,
          shuffledAnswers,
          questionIndex: 0,
          isAnswered: false,
        }));
      }
    }
  };

  handleTimer = () => {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearInterval(timerId);

      this.setState({
        timerId: null,
      });
    }

    this.setState({
      timerDuration: 30,
    }, () => {
      const INTERVAL_INCREMENT = 1000;

      const intervalId = setInterval(() => {
        const { timerDuration } = this.state;

        if (timerDuration > 0) {
          this.setState((prevState) => ({
            timerDuration: prevState.timerDuration - 1,
          }));
        } else {
          clearInterval(intervalId);
        }
      }, 1.0 * INTERVAL_INCREMENT);

      this.setState({
        timerId: intervalId,
      });
    });
  };

  handleAnswer = () => {
    const { timerId } = this.state;

    if (timerId !== null) {
      clearInterval(timerId);

      this.setState({
        timerId: null,
        timerDuration: 0,
      });
    }

    this.setState({
      isAnswered: true,
    });
  };

  render() {
    const {
      questions,
      shuffledAnswers,
      timerDuration,
      questionIndex,
      isAnswered,
    } = this.state;

    const FIXED_NUMBER = 10;
    const question = questions[questionIndex];
    const formattedTimerDuration = (timerDuration < FIXED_NUMBER)
      ? `0${timerDuration}`
      : timerDuration;

    return (
      <div className="game">
        <Header />

        {
          (question)
          && (
            <>
              <div className="question-category">
                <h1 data-testid="question-category">{ question.category }</h1>
              </div>

              <div className="question-text">
                <h2 data-testid="question-text">{ question.question }</h2>
              </div>

              <div>
                <h3>{ formattedTimerDuration }</h3>
              </div>

              <div data-testid="answer-options">
                {
                  shuffledAnswers
                    .map((answer, answerIndex) => {
                      const answerDataTestId = (answer === question.correct_answer)
                        ? 'correct-answer'
                        : `wrong-answer-${answerIndex}`;

                      const answerClassName = (answer === question.correct_answer)
                        ? 'green-border'
                        : 'red-border';

                      return (
                        <button
                          data-testid={ answerDataTestId }
                          key={ answerIndex }
                          className={ (isAnswered) ? answerClassName : '' }
                          disabled={ (timerDuration <= 0) }
                          onClick={ this.handleAnswer }
                        >
                          { answer }
                        </button>
                      );
                    })
                }
              </div>
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

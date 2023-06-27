import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setScoreAction,
  setAssertionsAction,
  setTimerRefreshAction,
  setGameAnsweredAction,
  resetTimerAction,
  resetGameAction,
} from '../redux/actions/index';

import { fetchQuestionsFromAPI } from '../services/triviaAPI';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    questions: [],
    answers: [],
    questionIndex: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(resetGameAction());
    this.validateLogin();
    this.fetchQuestions();
  }

  validateLogin = () => {
    const { email, name, history } = this.props;
    const token = localStorage.getItem('token');
    const isEmailValid = email.length > 0;
    const isNameValid = name.length > 0;
    const isLoginValid = isEmailValid && isNameValid;

    if (!(token && isLoginValid)) {
      history.push('/');
    }
  };

  fetchQuestions = async () => {
    const { dispatch, history } = this.props;
    const RESPONSE_CODE = 3;
    const token = localStorage.getItem('token');
    const questionsData = await fetchQuestionsFromAPI(token);

    if (questionsData.response_code === RESPONSE_CODE) {
      history.push('/');
    } else {
      const questions = questionsData.results;

      dispatch(setGameAnsweredAction(false));

      this.setState(() => ({
        questions,
        questionIndex: 0,
      }), () => {
        this.shuffleAnswers();
        dispatch(setTimerRefreshAction(true));
      });
    }
  };

  shuffleAnswers = () => {
    const { questions, questionIndex } = this.state;
    const question = questions[questionIndex];
    const questionAnswers = (question)
      ? [...question.incorrect_answers, question.correct_answer]
      : [];

    const RANDOMIZER_INCREMENT = 0.5;
    const answers = questionAnswers.sort(() => Math.random() - RANDOMIZER_INCREMENT);

    this.setState({ answers });
  };

  handleAnswer = ({ target }) => {
    const { questions, questionIndex } = this.state;
    const { dispatch, score, assertions, timerId, timerDuration } = this.props;
    const question = questions[questionIndex];

    if (timerId) {
      clearInterval(timerId);
      dispatch(resetTimerAction());
    }

    if (question && target.id === 'correct-answer') {
      const SCORE_INCREMENT = 10;
      const difficulties = { easy: 1, medium: 2, hard: 3 };
      const difficulty = difficulties[question.difficulty];
      const newScore = score + (SCORE_INCREMENT + (timerDuration * difficulty));

      dispatch(setScoreAction(newScore));
      dispatch(setAssertionsAction(assertions + 1));
    }

    dispatch(setGameAnsweredAction(true));
  };

  handleNext = () => {
    const { questions, questionIndex } = this.state;
    const { dispatch, gameAnswered } = this.props;
    const lastQuestionIndex = questions.length - 1;

    if (questionIndex === lastQuestionIndex) {
      const { history } = this.props;
      history.push('/feedback');
    } else if (gameAnswered) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
      }), () => {
        this.shuffleAnswers();
        dispatch(setGameAnsweredAction(false));
        dispatch(setTimerRefreshAction(true));
      });
    }
  };

  render() {
    const { questions, answers, questionIndex } = this.state;
    const { gameAnswered } = this.props;
    const question = questions[questionIndex];
    const lastQuestionIndex = questions.length - 1;

    return (
      <div className="game">
        <Header />

        {
          (question)
          && (
            <div>
              <div>
                <h1 data-testid="question-category">{ question.category }</h1>
              </div>

              <div>
                <h2 data-testid="question-text">{ question.question }</h2>
              </div>

              <Timer />

              <div data-testid="answer-options">
                {
                  answers
                    .map((answer, answerIndex) => {
                      const answerId = (answer === question.correct_answer)
                        ? 'correct-answer'
                        : `wrong-answer-${answerIndex}`;

                      const answerClassName = (answer === question.correct_answer)
                        ? 'green-border'
                        : 'red-border';

                      return (
                        <button
                          data-testid={ answerId }
                          key={ answerIndex }
                          id={ answerId }
                          className={ (gameAnswered) ? answerClassName : '' }
                          disabled={ gameAnswered }
                          onClick={ this.handleAnswer }
                        >
                          { answer }
                        </button>
                      );
                    })
                }
              </div>

              {
                (gameAnswered)
                && (
                  <button
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    {
                      (questionIndex === lastQuestionIndex)
                        ? 'Feedback'
                        : 'Próxima pergunta'
                    }
                  </button>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ player, game }) => {
  const { email, name, score, assertions } = player;
  const { timerId, timerDuration, gameAnswered } = game;
  return { email, name, score, assertions, timerId, timerDuration, gameAnswered };
};

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  timerId: PropTypes.number,
  timerDuration: PropTypes.number.isRequired,
  gameAnswered: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Game.defaultProps = {
  timerId: null,
};

export default connect(mapStateToProps)(Game);

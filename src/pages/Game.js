import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScoreAction, setassertionsAction } from '../redux/actions';
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

        this.setState(() => ({
          questions,
          questionIndex: 0,
          isAnswered: false,
        }), () => {
          this.shuffleAnswers();
        });
      }
    }
  };

  shuffleAnswers = () => {
    const { questions, questionIndex } = this.state;
    const question = questions[questionIndex];
    const answers = (question)
      ? [...question.incorrect_answers, question.correct_answer]
      : [];

    const RANDOM_INCREMENT = 0.5;
    const shuffledAnswers = answers.sort(() => Math.random() - RANDOM_INCREMENT);

    this.setState({
      shuffledAnswers,
    });
  };

  handleTimer = () => {
    const { timerId } = this.state;

    if (timerId) {
      clearInterval(timerId);
      this.setState({ timerId: null });
    }

    this.setState({
      timerDuration: 30,
      isAnswered: false,
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

          this.setState({
            timerId: null,
            timerDuration: 0,
            isAnswered: true,
          });
        }
      }, INTERVAL_INCREMENT);

      this.setState({
        timerId: intervalId,
      });
    });
  };

  handleAnswer = ({ target }) => {
    const {
      questions,
      timerId,
      questionIndex,
    } = this.state;

    const question = questions[questionIndex];

    if (timerId) {
      clearInterval(timerId);
      this.setState({ timerId: null, timerDuration: 0 });
    }

    if (question && target.id === 'correct-answer') {
      const { timerDuration } = this.state;
      const { dispatch, score, assertions } = this.props;
      const SCORE_INCREMENT = 10;
      const difficulties = { easy: 1, medium: 2, hard: 3 };
      const difficulty = difficulties[question.difficulty];
      const newScore = score + (SCORE_INCREMENT + (timerDuration * difficulty));

      dispatch(setScoreAction(newScore));
      dispatch(setassertionsAction(assertions + 1));
    }

    this.setState({
      isAnswered: true,
    });
  };

  handleNext = () => {
    const { questions, questionIndex, isAnswered } = this.state;
    const lastQuestionIndex = questions.length - 1;

    if (questionIndex === lastQuestionIndex) {
      const { history } = this.props;
      history.push('/feedback');
    } else if (isAnswered) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        isAnswered: false,
      }), () => {
        this.shuffleAnswers();
        this.handleTimer();
      });
    }
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
                          className={ (isAnswered) ? answerClassName : '' }
                          disabled={ isAnswered }
                          onClick={ this.handleAnswer }
                        >
                          { answer }
                        </button>
                      );
                    })
                }
              </div>

              {
                (isAnswered)
                && (
                  <button
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    Próxima
                  </button>
                )
              }
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { score, assertions } = player;
  return { score, assertions };
};

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);

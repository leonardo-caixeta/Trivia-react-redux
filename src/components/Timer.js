import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  setTimerIdAction,
  setTimerRefreshAction,
  setTimerDurationAction,
  setGameAnsweredAction,
  resetTimerAction,
} from '../redux/actions/index';

class Timer extends Component {
  componentDidMount() {
    this.handleTimerRefresh();
  }

  componentDidUpdate() {
    this.handleTimerRefresh();
  }

  handleTimer = () => {
    const { dispatch, timerId } = this.props;
    const TIMER_DURATION = 30;
    const INTERVAL_INCREMENT = 1000;

    if (timerId) {
      clearInterval(timerId);
      dispatch(setTimerIdAction(null));
    }

    dispatch(setTimerDurationAction(TIMER_DURATION));
    dispatch(setGameAnsweredAction(false));

    const intervalId = setInterval(() => {
      const { timerDuration } = this.props;

      if (timerDuration > 0) {
        dispatch(setTimerDurationAction(timerDuration - 1));
      } else {
        clearInterval(intervalId);
        dispatch(resetTimerAction());
        dispatch(setGameAnsweredAction(true));
      }
    }, INTERVAL_INCREMENT);

    dispatch(setTimerIdAction(intervalId));
  };

  handleTimerRefresh = () => {
    const { dispatch, timerRefresh } = this.props;

    if (timerRefresh) {
      dispatch(setTimerRefreshAction(false));
      this.handleTimer();
    }
  };

  render() {
    const { timerDuration } = this.props;
    const FIXED_NUMBER = 10;
    const formattedTimerDuration = (timerDuration < FIXED_NUMBER)
      ? `0${timerDuration}`
      : timerDuration;

    return (
      <div>
        { formattedTimerDuration }
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => {
  const { timerId, timerRefresh, timerDuration } = game;
  return { timerId, timerRefresh, timerDuration };
};

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timerId: PropTypes.number,
  timerRefresh: PropTypes.bool.isRequired,
  timerDuration: PropTypes.number.isRequired,
};

Timer.defaultProps = {
  timerId: null,
};

export default connect(mapStateToProps)(Timer);

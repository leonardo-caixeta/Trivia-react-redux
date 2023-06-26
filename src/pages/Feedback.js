import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const ASSERTION_DELIMITER = 3;

    return (
      <div>
        <p data-testid="feedback-text">
          {
            (assertions < ASSERTION_DELIMITER)
              ? 'Could be better...'
              : 'Well Done!'
          }
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { assertions } = player;
  return { assertions };
};

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

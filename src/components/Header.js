import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { playerName, score, email } = this.props;
    const hashEmail = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${hashEmail}`;

    return (
      <div className="header">
        <img
          src={ gravatarEmail }
          alt="avatar do usuário"
          data-testid="header-profile-picture"
        />

        <p data-testid="header-player-name">{playerName}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  playerName: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hashEmail = md5(email).toString();
    const gravatarEmail = `https://www.gravatar.com/avatar/${hashEmail}`;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="User avatar"
          src={ gravatarEmail }
        />

        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => {
  const { email, name, score } = player;
  return { email, name, score };
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);

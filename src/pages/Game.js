import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <h1>Game</h1>
    );
  }
}

export default connect()(Game);

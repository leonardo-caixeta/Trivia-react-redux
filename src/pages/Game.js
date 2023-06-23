import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <h1>Game</h1>

        <Header />
      </div>

    );
  }
}

export default connect()(Game);

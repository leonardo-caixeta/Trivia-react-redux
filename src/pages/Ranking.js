import React, { Component } from 'react';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <PlayAgainBtn />
      </div>
    );
  }
}

export default Ranking;

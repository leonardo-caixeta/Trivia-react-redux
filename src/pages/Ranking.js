import React, { Component } from 'react';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Ranking extends Component {
  sortRanking = () => {
    const playerScore = JSON.parse(localStorage.getItem('playerScore'));
    const sorterPlayerScore = playerScore.sort((a, b) => b.score - a.score);
    // const sorterPlayerName = sorterPlayerScore.sort((a, b) => b.name - a.name);
    return sorterPlayerScore.map((player, index) => (
      <div key={ index }>
        <p data-testid={ `player-name-${index}` }>{player.playerName}</p>
        <p data-testid={ `player-score-${index}` }>{player.score}</p>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <PlayAgainBtn />
        { this.sortRanking() }
      </div>
    );
  }
}

export default Ranking;

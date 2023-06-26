import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Feedback from '../pages/Feedback';

const mockPush = jest.fn();
const mockHistory = createMemoryHistory();
mockHistory.push = mockPush;
const mockStore = {
  getState: () => ({
    player: {
      score: 100,
      assertions: 8,
    },
  }),
  subscribe: () => {},
  dispatch: () => {},
};

describe('Testes para o arquivo Feedback na pasta `pages`', () => {
  test('Testa se os elementos estão no documento', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Feedback />
        </Router>
      </Provider>
    );

    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackText = screen.getByTestId('feedback-text');
    const rankingButton = screen.getByTestId('btn-ranking');
    const playAgainButton = screen.getByTestId('btn-play-again');

    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();
    expect(playAgainButton).toBeInTheDocument();
  });

  test('Testa a funcionalidade dos botões', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Feedback />
        </Router>
      </Provider>
    );

    const rankingButton = screen.getByTestId('btn-ranking');
    const playAgainButton = screen.getByTestId('btn-play-again');

    fireEvent.click(rankingButton);
    expect(mockPush).toHaveBeenCalledWith('/ranking');

    fireEvent.click(playAgainButton);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('Testa se o botão de ranking redireciona corretamente', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Feedback />
        </Router>
      </Provider>
    );

    const rankingButton = screen.getByTestId('btn-ranking');

    fireEvent.click(rankingButton);
    expect(mockPush).toHaveBeenCalledWith('/ranking');
  });

  test('Testa se o botão de jogar novamente redireciona corretamente', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Feedback />
        </Router>
      </Provider>
    );

    const playAgainButton = screen.getByTestId('btn-play-again');

    fireEvent.click(playAgainButton);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  test('Testa se o texto exibido é o correto', () => {
    render(
      <Provider store={mockStore}>
        <Router history={mockHistory}>
          <Feedback />
        </Router>
      </Provider>
    );

    const feedbackText = screen.getByTestId('feedback-text');

    expect(feedbackText).toHaveTextContent('Well Done!');
  });
});

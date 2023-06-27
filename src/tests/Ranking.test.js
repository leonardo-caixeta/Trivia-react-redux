import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

beforeEach(async () => {
  const { history, store } = renderWithRouterAndRedux(<App />);
  const API_URL = 'https://opentdb.com/api_token.php?command=request';
  const EMAIL_INPUT = 'input-gravatar-email';
  const NAME_INPUT = 'input-player-name';
  const BUTTON_INPUT = 'btn-play';
  const EMAIL = 'exemplo@teste.com';
  const NAME = 'Exemplo';
  const ASSERTIONS = 0
  const SCORE = 0
  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const nameInput = screen.getByTestId(NAME_INPUT);
  const buttonInput = screen.getByTestId(BUTTON_INPUT);

  const API_RESPONSE = {
    response_code: 0,
    response_message: 'Token Generated Successfully!',
    token: 'bb31b112381f90d7bdac988dbd9ddc054d8edda9fc00ce47207eae83f8097bb9',
  };

  jest.spyOn(global, 'fetch');

  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_RESPONSE),
  });

  userEvent.type(emailInput, EMAIL);
  userEvent.type(nameInput, NAME);
  expect(emailInput).toHaveValue(EMAIL);
  expect(nameInput).toHaveValue(NAME);
  expect(buttonInput).toBeEnabled();
  userEvent.click(buttonInput);

  await waitFor(() => {
    expect(store.getState().player).toEqual({
      gravatarEmail: EMAIL,
      name: NAME,
      assertions: ASSERTIONS,
      score: SCORE
    });

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(API_URL);
  expect(localStorage.getItem('token')).toBe(API_RESPONSE.token);
  expect(history.location.pathname).toBe('/game');
  });
});

describe('Testa componente de Ranking', () => {
  it('Testa ranking', () => {
    const {history} = renderWithRouterAndRedux(<App />)
    history.push('/ranking')
    expect(screen.getByText('Exemplo')).toBeInTheDocument();

  });
});

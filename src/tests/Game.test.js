import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

import App from '../App';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';


beforeEach(async () => {
  const { history, store } = renderWithRouterAndRedux(<App />);
  const API_URL = 'https://opentdb.com/api_token.php?command=request';
  const EMAIL_INPUT = 'input-gravatar-email';
  const NAME_INPUT = 'input-player-name';
  const BUTTON_INPUT = 'btn-play';
  const EMAIL = 'exemplo@teste.com';
  const NAME = 'Exemplo';
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
      email: EMAIL,
      name: NAME,
    });

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(API_URL);
  expect(localStorage.getItem('token')).toBe(API_RESPONSE.token);
  expect(history.location.pathname).toBe('/game');
  });
});

describe('Testa página de Game', () => {
  it('01. Teste se os elementos estão no documento', async () => {
    renderWithRouterAndRedux(<App />)

    const QUESTION_CATEGORY = 'question-category';
    const QUESTION_TEXT = 'question-text';
    const QUESTION_OPTIONS= 'answer-options';
    const questionCategory = screen.getByTestId(QUESTION_CATEGORY)
    const questionText = screen.getByTestId(QUESTION_TEXT)
    const answerOption = screen.getByTestId(QUESTION_OPTIONS)

    expect(questionCategory).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(answerOption).toBeInTheDocument();

    await waitFor(() => {

    });
  });
  // it('', () => {});
  // it('', () => {});
});

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes para o componente `Login`', () => {
  const API_URL = 'https://opentdb.com/api_token.php?command=request';
  const EMAIL_INPUT = 'input-gravatar-email';
  const NAME_INPUT = 'input-player-name';
  const BUTTON_INPUT = 'btn-play';
  const SETTINGS_INPUT = 'btn-settings';
  const EMAIL = 'exemplo@teste.com';
  const NAME = 'Exemplo';

  test('01. Teste se os elementos estão no documento', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const nameInput = screen.getByTestId(NAME_INPUT);
    const buttonInput = screen.getByTestId(BUTTON_INPUT);
    const settingsInput = screen.getByTestId(SETTINGS_INPUT);

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
    expect(settingsInput).toBeInTheDocument();
  });

  test('02. Teste o input de email', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const buttonInput = screen.getByTestId(BUTTON_INPUT);

    userEvent.type(emailInput, EMAIL);
    expect(emailInput).toHaveValue(EMAIL);
    expect(buttonInput).toBeDisabled();
  });

  test('03. Teste o input de nome', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(NAME_INPUT);
    const buttonInput = screen.getByTestId(BUTTON_INPUT);

    userEvent.type(nameInput, NAME);
    expect(nameInput).toHaveValue(NAME);
    expect(buttonInput).toBeDisabled();
  });

  test('04. Teste o botão de jogar', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
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

  test('05. Teste o  botão de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsInput = screen.getByTestId(SETTINGS_INPUT);

    userEvent.click(settingsInput);
    expect(history.location.pathname).toBe('/settings');
  });
});

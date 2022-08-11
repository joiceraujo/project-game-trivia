import React from 'react';
import { screen } from '@testing-library/dom'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import App from '../App';

describe('Testes a página de login', () => {
  it('Deve habilitar o botão de login apenas com nome e email válidos', () => {
    renderWithRouterAndRedux(<App />);
    
    const loginButton = screen.getByRole('button', { name: /play/i });

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'email@isvalid.com');

    expect(loginButton).toBeDisabled();

    const nameField = screen.getByTestId('input-player-name');
    userEvent.type(nameField, 'ThisIsAValidName');

    expect(loginButton).not.toBeDisabled();
  });

  it('Deve ir para a página de configurações ao clicar no botão "Settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.click(screen.getByTestId('btn-settings'));
    expect(history.location.pathname).toBe("/settings");
  });

  it('Deve iniciar o jogo ao clicar em "Play"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    userEvent.type(emailInput, 'email@test.com');
    
    const nameField = screen.getByTestId('input-player-name');
    userEvent.type(nameField, 'ThisIsAValidName');

    userEvent.click(screen.getByTestId('btn-play'));

    await waitFor(() => {
      expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
    })

    expect(history.location.pathname).toBe("/teladojogo");
  });
});
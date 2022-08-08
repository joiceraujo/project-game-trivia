import React from 'react';
import { screen } from '@testing-library/dom'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
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
});
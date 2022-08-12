import React from 'react';
import { screen } from '@testing-library/dom'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes a página de ranking', () => {
  it('Deve reiniciar o jogo ao clicar em "Back to home"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/ranking');
    
    const homeBtn = screen.getByTestId('btn-go-home');
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });

  it('Deve mostrar o ranking dos jogadores', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const mockRanking = [
      {
        name: 'um jogador',
        score: 108,
        picture: 'https://www.gravatar.com/avatar/7078faa521a8c19fa7fb969c1e7ee75a'
      },
      {
        name: 'outro jogador',
        score: 0,
        picture: 'https://www.gravatar.com/avatar/7078faa521a8c19fa7fb969c1e7ee75a'
      },
      {
        name: 'um terceiro jogador',
        score: 50,
        picture: 'https://www.gravatar.com/avatar/7078faa521a8c19fa7fb969c1e7ee75a'
      }
    ];

    localStorage.setItem('ranking', JSON.stringify(mockRanking));

    history.push('/ranking');

    expect(screen.getByTestId('player-name-0').innerHTML).toBe('um jogador');
    expect(screen.getByTestId('player-name-1').innerHTML).toBe('um terceiro jogador');
    expect(screen.getByTestId('player-name-2').innerHTML).toBe('outro jogador');

  })
});
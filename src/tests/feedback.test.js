import React from 'react';
import { screen } from '@testing-library/dom'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes a página de feedbacks', () => {
  it('Deve ir para a página de ranking ao clicar no botão "Ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');
    
    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);

    expect(history.location.pathname).toBe('/ranking');
    
  });

  it('Deve reiniciar o jogo ao clicar em "Play Again"', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/feedback');
    
    const replayBtn = screen.getByTestId('btn-play-again');
    userEvent.click(replayBtn);

    expect(history.location.pathname).toBe('/');
  });
});
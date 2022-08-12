import React from 'react';
import { screen } from '@testing-library/dom'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import App from '../App';

const mockToken = {
  "response_code": 0,
  "response_message": "Token Generated Successfully!",
  "token": "e3dcd67c9d23908befabb4bdccbe32e7ee42c74b4199abe126b157d41e327629"
};

const mockQuestions = {
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "medium",
      "question": "Pistons were added to Minecraft in Beta 1.5.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    },
    {
      "category": "Entertainment: Television",
      "type": "multiple",
      "difficulty": "easy",
      "question": "In &quot;Breaking Bad&quot;, Walter White is a high school teacher diagnosed with which form of cancer?",
      "correct_answer": "Lung Cancer",
      "incorrect_answers": [
        "Prostate Cancer",
        "Brain Cancer",
        "Testicular Cancer"
      ]
    },
    {
      "category": "Entertainment: Comics",
      "type": "multiple",
      "difficulty": "medium",
      "question": "In the comics, which Sonic character took command of the Dark Legion after Luger&#039;s assassination?",
      "correct_answer": "Lien-Da",
      "incorrect_answers": [
        "Kragok",
        "Dimitri",
        "Remington"
      ]
    },
    {
      "category": "Entertainment: Film",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which actor and martial artist starred as Colonel Guile in the 1994 action film adaptation of Street Fighter?",
      "correct_answer": "Jean-Claude Van Damme",
      "incorrect_answers": [
        "Chuck Norris",
        "Steven Seagal",
        "Scott Adkins"
      ]
    },
    {
      "category": "Geography",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which of these Japanese islands is the largest by area?",
      "correct_answer": "Shikoku",
      "incorrect_answers": [
        "Iki",
        "Odaiba",
        "Okinawa"
      ]
    }
  ]
};

const mockQuestionsFail = {
  "response_code": 3,
  "results": [],
};

describe('Testes a tela do jogo', () => {
  it('Deve desabilitar as opções de resposta quando o tempo acabar', async () => {
    jest.setTimeout(40000);
  
    renderWithRouterAndRedux(<App />);
  
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador');
    userEvent.click(screen.getByTestId('btn-play'));
  
    await waitFor(() => {
      expect(localStorage.token).not.toBe(undefined);
    }, {
      timeout: 40000,
    })
  
    const correctAnswer = await screen.findByTestId('correct-answer');
    expect(correctAnswer).toBeInTheDocument();
  
  
    await waitFor(() => {
      expect(screen.getByTestId('timer').innerHTML).toBe('0');
    }, {
      timeout: 40000,
    })
  
    expect(screen.getByTestId('correct-answer')).toBeDisabled();
  });

  it('Deve reiniciar o jogo ao clicar em "Back to home"', async () => {
    jest.setTimeout(40000);

    const { history } = renderWithRouterAndRedux(<App />);
  
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador');
    userEvent.click(screen.getByTestId('btn-play'));
    
    await waitFor(() => {
      expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
    }, {
      timeout: 40000,
    })
    
    userEvent.click(screen.getByTestId('btn-go-home'));
    
    expect(history.location.pathname).toBe('/');
  });

  it('Deve computar os pontos corretamente', async () => {
    jest.setTimeout(5000);
    renderWithRouterAndRedux(<App />);

    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(mockToken)
          } else {
            return Promise.resolve(mockQuestions)
          }
        },
      })
    );

    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador');
    userEvent.click(screen.getByTestId('btn-play'));
 
    await waitFor(() => {
      expect(localStorage.token).not.toBe(undefined);
    }, {
      timeout: 5000
    })

    expect(screen.getByText('Pistons were added to Minecraft in Beta 1.5.')).toBeInTheDocument();

    for (let index = 0; index < 4; index++) {
      await waitFor(() => {
        expect(screen.getByTestId('correct-answer')).toBeInTheDocument();
      }, {
        timeout: 5000,
      });

      const correctAnswer = await screen.findByTestId('correct-answer');
      userEvent.click(correctAnswer);
      const nextBtn = await screen.findByTestId('btn-next');
      userEvent.click(nextBtn);
    }

    await waitFor(() => {
      expect(screen.getByText('Okinawa')).toBeInTheDocument();
    }, {
      timeout: 5000,
    })

    userEvent.click(screen.getByText('Okinawa'));
    userEvent.click(await screen.findByTestId('btn-next'));

    await waitFor(() => {
      expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
    }, {
      timeout: 5000,
    });
    expect(screen.getByText('Well Done!'));

    userEvent.click(screen.getByTestId('btn-play-again'));
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador2@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador2');
    userEvent.click(screen.getByTestId('btn-play'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /true/i })).toBeInTheDocument();
    });
    
    userEvent.click(screen.getByText('True'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(screen.getByText('Brain Cancer'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(screen.getByText('Kragok'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(screen.getByText('Chuck Norris'));
    userEvent.click(await screen.findByTestId('btn-next'));

    userEvent.click(screen.getByText('Okinawa'));
    userEvent.click(await screen.findByTestId('btn-next'));

    expect(screen.getByText('Could be better...'));

    await waitFor(() => {
      expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
    }, {
      timeout: 5000,
    });
    
    userEvent.click(screen.getByTestId('btn-ranking'));
    expect(screen.getByText('Jogador'));
    expect(screen.getByText('Jogador2'));
  });

  it('Deve ir para a tela de login caso falhe ao buscar o token', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    global.fetch = (url) => (
      Promise.resolve({
        json: () => {
          if(url.includes('api_token.php')) {
            return Promise.resolve(mockToken)
          } else {
            return Promise.resolve(mockQuestionsFail)
          }
        },
      })
    );

    userEvent.type(screen.getByTestId('input-gravatar-email'), 'jogador@email.com');
    userEvent.type(screen.getByTestId('input-player-name'), 'Jogador');
    userEvent.click(screen.getByTestId('btn-play'));

    expect(history.location.pathname).toBe('/');
  })
});

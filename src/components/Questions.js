import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveQuestions, saveScore } from '../redux/actions';

const TIMER_START = 30;

class Questions extends React.Component {
  state = {
    correct: '',
    wrong: '',
    index: 0,
    questions: [],
    correctSelection: 0,
    logout: false,
    timer: 35,
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    await this.getQuestions(token);
    const random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    this.setState({ correctSelection: random });
    this.counter();
  }

  componentWillUnmount = () => {
    clearInterval(this.counter);
  }

  getQuestions = async (token) => {
    const magicErrorNum = 3;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const getQuestion = await fetch(url);
    const data = await getQuestion.json();
    const { saveQuestion } = this.props;
    saveQuestion(data);

    if (data.response_code === magicErrorNum) {
      localStorage.removeItem('token');
      this.setState({ logout: true });
    }
    this.setState({ questions: data.results });
  };

  handleAnswers = ({ target }, question) => {
    this.setState({ correct: 'correctAnswer', wrong: 'wrongAnswer' });

    if (target.name === 'correct') {
      const { timer } = this.state;
      const { difficulty } = question;
      const TEN = 10;
      const { scoreDispatch } = this.props;
      const score = TEN + (timer > TIMER_START
        ? TIMER_START : Number(timer) * this.getScoreValue(difficulty));
      scoreDispatch(score);
    }
  };

  getScoreValue = (difficulty) => {
    const HARD_VALUE = 3;
    const MEDIUM_VALUE = 2;
    const EASY_VALUE = 1;
    if (difficulty === 'hard') { return HARD_VALUE; }
    if (difficulty === 'medium') { return MEDIUM_VALUE; }
    return EASY_VALUE;
  }

  counter = () => {
    const ONE_SEC = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      }
    }, ONE_SEC);
  }

  render() {
    const {
      questions,
      correct,
      wrong,
      index,
      correctSelection,
      logout,
      timer,
    } = this.state;

    return (
      <div>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>

            {timer <= TIMER_START && <p>{timer}</p>}

            <p data-testid="question-text">{questions[index].question}</p>

            {questions.length > 0 && correctSelection === 1 ? (
              <section>
                <div data-testid="answer-options">
                  {questions[index].incorrect_answers.reverse()
                    .map((element, position) => (
                      <div key={ position }>
                        <button
                          type="button"
                          onClick={ (e) => this.handleAnswers(e, questions[index]) }
                          data-testid={ `wrong-answer-${position}` }
                          name="wrong"
                          className={ wrong }
                          disabled={ timer <= 0 }
                        >
                          {element}
                        </button>
                      </div>
                    ))}
                </div>
                <div data-testid="answer-options">
                  <button
                    type="button"
                    data-testid="correct-answer"
                    id={ index }
                    name="correct"
                    className={ correct }
                    onClick={ (e) => this.handleAnswers(e, questions[index]) }
                    disabled={ timer <= 0 }
                  >
                    {questions[index].correct_answer}
                  </button>
                </div>
              </section>
            ) : (
              <section>
                <div data-testid="answer-options">
                  <button
                    type="button"
                    data-testid="correct-answer"
                    id={ index }
                    name="correct"
                    className={ correct }
                    onClick={ (e) => this.handleAnswers(e, questions[index]) }
                    disabled={ timer <= 0 }
                  >
                    {questions[index].correct_answer}
                  </button>
                </div>
                <div data-testid="answer-options">
                  {questions[index].incorrect_answers
                    .reverse()
                    .map((element, position) => (
                      <div key={ position }>
                        <button
                          id="wrong"
                          type="button"
                          onClick={ (e) => this.handleAnswers(e, questions[index]) }
                          data-testid={ `wrong-answer-${position}` }
                          name="wrong"
                          className={ wrong }
                          disabled={ timer <= 0 }
                        >
                          {element}
                        </button>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>
        )}
        { logout && <Redirect to="/" />}
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  saveQuestion: PropTypes.func,
  getQuestions: PropTypes.array,
  scoreDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveQuestion: (questions) => dispatch(saveQuestions(questions)),
  scoreDispatch: (score) => dispatch(saveScore(score)),
});

const mapStateToProps = (store) => ({
  getQuestions: store.questionsReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAssertions, saveQuestions, saveScore } from '../redux/actions';

const TIMER_START = 30;

class Questions extends React.Component {
  state = {
    correct: '',
    wrong: '',
    index: 0,
    questions: [],
    logout: false,
    timer: 35,
    nextButton: false,
    goToFeedbackPage: false,
    currentAnswers: [],
    assertions: 0,
    gotAnswer: false,
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    await this.getQuestions(token);
    this.counter();
    this.setState({ currentAnswers: this.sortQuestions() });
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
    this.setState({
      correct: 'correctAnswer',
      wrong: 'wrongAnswer',
      nextButton: true,
      gotAnswer: true,
    });

    const { gotAnswer } = this.state;

    if (target.name === 'correct' && !gotAnswer) {
      const { timer } = this.state;
      const { difficulty } = question;
      const TEN = 10;
      const { scoreDispatch } = this.props;
      const score = TEN + (timer > TIMER_START
        ? TIMER_START : Number(timer) * this.getScoreValue(difficulty));
      scoreDispatch(score);
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
      }));
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

  setNextQuestion = () => {
    const { index, questions, assertions } = this.state;
    if (index < questions.length - 1) {
      this.setState({
        index: index + 1,
        nextButton: false,
        correct: '',
        wrong: '',
        timer: 30,
        gotAnswer: false,
      }, () => {
        this.setState({ currentAnswers: this.sortQuestions() });
      });
    } else {
      const { assertionsDispatch } = this.props;
      assertionsDispatch(assertions);
      this.savePlayerFinalScore();
      this.setState({ goToFeedbackPage: true });
    }
  }

  savePlayerFinalScore = () => {
    const { name, score, gravatar } = this.props;
    const player = { name, score, picture: gravatar };

    if (!localStorage.ranking) {
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else {
      const prevRank = JSON.parse(localStorage.ranking);
      const newRank = [...prevRank, player];
      localStorage.setItem('ranking', JSON.stringify(newRank));
    }
  }

  sortQuestions = () => {
    const { index, questions } = this.state;
    const ans = [
      ...questions[index].incorrect_answers,
    ];
    const randomNumber = Math.round(Math.random() * (ans.length));
    ans.splice(randomNumber, 0, questions[index].correct_answer);
    return ans;
  }

  isAnswerCorrect = (answer) => {
    const { index, questions } = this.state;
    return answer === questions[index].correct_answer;
  }

  render() {
    const {
      questions,
      correct,
      wrong,
      index,
      logout,
      timer,
      nextButton,
      goToFeedbackPage,
      currentAnswers,
    } = this.state;

    return (
      <div>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>

            {timer <= TIMER_START && <p>{timer}</p>}

            <p data-testid="question-text">{questions[index].question}</p>

            <div data-testid="answer-options">
              {
                currentAnswers.map((el, position) => (
                  <button
                    key={ el }
                    type="button"
                    onClick={ (e) => this.handleAnswers(e, questions[index]) }
                    data-testid={ this.isAnswerCorrect(el)
                      ? 'correct-answer' : `wrong-answer-${position}` }
                    name={ this.isAnswerCorrect(el) ? 'correct' : 'wrong' }
                    className={ this.isAnswerCorrect(el) ? correct : wrong }
                    disabled={ timer <= 0 }
                  >
                    {el}
                  </button>
                ))
              }
            </div>
          </div>
        )}
        {nextButton && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.setNextQuestion }
          >
            Next
          </button>
        )}
        { logout && <Redirect to="/" />}
        { goToFeedbackPage && <Redirect to="/feedback" /> }
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }),
  saveQuestion: PropTypes.func,
  getQuestions: PropTypes.array,
  scoreDispatch: PropTypes.func,
  assertionsDispatch: PropTypes.func,
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveQuestion: (questions) => dispatch(saveQuestions(questions)),
  scoreDispatch: (score) => dispatch(saveScore(score)),
  assertionsDispatch: (assertions) => dispatch(saveAssertions(assertions)),
});

const mapStateToProps = (store) => ({
  getQuestions: store.questionsReducer.questions,
  gravatar: store.player.gravatar,
  name: store.player.name,
  score: store.player.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

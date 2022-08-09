import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveQuestions } from '../redux/actions';

class Questions extends React.Component {
  state = {
    correct: '',
    wrong: '',
    index: 0,
    questions: [],
    correctSelection: 0,
    logout: false,
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    await this.getQuestions(token);
    const random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    this.setState({ correctSelection: random });
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

  handleAnswers = () => {
    this.setState({ correct: 'correctAnswer', wrong: 'wrongAnswer' });
  };

  render() {
    const {
      questions,
      correct,
      wrong,
      index,
      correctSelection,
      logout,
    } = this.state;

    return (
      <div>
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[index].category}</p>

            <p data-testid="question-text">{questions[index].question}</p>

            {questions.length > 0 && correctSelection === 1 ? (
              <section>
                <div data-testid="answer-options">
                  {questions[index].incorrect_answers.reverse()
                    .map((element, position) => (
                      <div key={ position }>
                        <button
                          type="button"
                          onClick={ this.handleAnswers }
                          data-testid={ `wrong-answer-${position}` }
                          name="wrong"
                          className={ wrong }
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
                    onClick={ this.handleAnswers }
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
                    onClick={ this.handleAnswers }
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
                          onClick={ this.handleAnswers }
                          data-testid={ `wrong-answer-${position}` }
                          name="wrong"
                          className={ wrong }
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
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveQuestion: (questions) => dispatch(saveQuestions(questions)),
});

const mapStateToProps = (store) => ({
  getQuestions: store.questionsReducer.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

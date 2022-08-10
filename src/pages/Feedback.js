import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Message from '../components/Message';
import { resetGame } from '../redux/actions';

class Feedback extends React.Component {
  backToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <Message />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.backToLogin }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Feedback);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { resetGame } from '../redux/actions';

class Game extends React.Component {
  backToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header />
        <Questions />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.backToLogin }
        >
          Back to home
        </button>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Game);

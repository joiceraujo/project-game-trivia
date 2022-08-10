import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetGame } from '../redux/actions';

class Ranking extends React.Component {
  backToLogin = () => {
    const { history, reset } = this.props;
    reset();
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.backToLogin }
        >
          Ranking
        </button>
      </div>);
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
  reset: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Ranking);

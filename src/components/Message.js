import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Message extends Component {
  mensagens = (pontos) => {
    const acertosMin = 3;
    if (pontos < acertosMin) { return 'Could be better...'; }
    return 'Well Done!';
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">
          {this.mensagens(assertions)}
        </p>
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
      </div>
    );
  }
}

Message.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Message);

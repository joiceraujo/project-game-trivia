import React from 'react';
import Header from '../components/Header';
import Message from '../components/Message';

class Feedback extends React.Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <Message />
      </div>
    );
  }
}

export default Feedback;

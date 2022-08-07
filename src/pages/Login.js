import React from 'react';
import PropTypes from 'prop-types';
import apiPerguntas from '../services.js/triviaApi';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonEnable: false,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.changeButton();
    });
  }

  changeButton = () => {
    const { email, name } = this.state;
    this.setState({
      buttonEnable: name.length > 1 && this.emailVerify(email),
    });
  }

  emailVerify = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  chamaApi = async (event) => {
    event.preventDefault();
    const response = await apiPerguntas();
    localStorage.setItem('token', response.token);
    const { history } = this.props;
    history.push('/teladojogo');
  }

  render() {
    const { buttonEnable, email, name } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
            value={ name }
          />
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            placeholder="Digite seu email"
            onChange={ this.handleChange }
            value={ email }
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ !buttonEnable }
            onClick={ this.chamaApi }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.string.isRequired,
};
export default Login;

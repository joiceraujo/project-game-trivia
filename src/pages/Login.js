import React from 'react';

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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

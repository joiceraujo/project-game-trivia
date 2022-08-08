import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  getGravatar = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    return `https://wwww.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name } = this.props;
    return (
      <header>
        <span data-testid="header-player-name">{name}</span>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar() }
          alt="gravatar"
        />
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  name: store.user.name,
  email: store.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);

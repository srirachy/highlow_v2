import React from 'react';
import PropTypes from 'prop-types';

function Header({ type = 'h1', children }) {
  const HeaderElmt = type;
  return <HeaderElmt>{children}</HeaderElmt>;
}

Header.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};

Header.defaultProps = {
  children: '',
  type: 'h1',
};

export default Header;

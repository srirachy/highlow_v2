import React from 'react';
import PropTypes from 'prop-types';

function Text({ children }) {
  return <p>{children}</p>;
}

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Text.defaultProps = {
  children: '',
};

export default Text;

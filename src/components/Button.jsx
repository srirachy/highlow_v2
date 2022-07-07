import React from 'react';
import PropTypes from 'prop-types';

function Button({ disabled, value, children, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      value={value}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  value: 0,
  onClick: () => {},
  className: '',
};

export default Button;

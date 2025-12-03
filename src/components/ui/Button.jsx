import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  to,
  as = 'link', // 'link' ou 'button'
  variant = 'primary',
  children,
  onClick,
  type = 'button'
}) => {
  const baseClass =
    'ccib-btn ccib-btn-' + variant;

  if (as === 'button') {
    return (
      <button type={type} className={baseClass} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={baseClass}>
      {children}
    </Link>
  );
};

export default Button;

import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/**
 * Quando não existe nada para extender utilizar "type";
 * interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { };
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;

import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

/**
 * Quando não existe nada para extender utilizar "type";
 * interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { };
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;

import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string; // perminte que o componente receba uma estilização de um elemento superior, e não pode ser obrigatoria
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-2">{children}</div>;
};

export default Card;

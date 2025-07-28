import React from 'react';
import clsx from 'clsx';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={clsx("bg-white dark:bg-gray-800 shadow-md rounded-lg p-4", className)}>
      {children}
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-black hover:bg-gray-300': variant === 'secondary',
        },
        className
      )}
    />
  );
};

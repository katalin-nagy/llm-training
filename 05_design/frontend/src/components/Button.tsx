import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyle =
    'px-4 py-2 rounded-md text-sm font-medium focus:outline-none inline-flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary:
      'bg-white text-black border border-gray-300 hover:bg-gray-50',
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

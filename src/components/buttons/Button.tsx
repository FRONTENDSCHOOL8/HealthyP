import React, { ReactEventHandler } from 'react';

interface ButtonProps {
  clickHandler: ReactEventHandler;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ clickHandler, text }) => {
  return (
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  );
};

export default Button;
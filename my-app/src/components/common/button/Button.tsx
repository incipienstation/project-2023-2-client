import React from "react";
import './Button.scss'

interface ButtonProps {
  name: string;
  onClick: () => void | Promise<void>;
}

const Button: React.FC<ButtonProps> = ({name: name, onClick: handleClick}) => {
  return (<div className="button" onClick={handleClick}>{name}</div>)
}

export default Button
import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
  
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button type={type} className={styles["login-button"]} >
      {text}
    </button>
  );
};



export default Button;
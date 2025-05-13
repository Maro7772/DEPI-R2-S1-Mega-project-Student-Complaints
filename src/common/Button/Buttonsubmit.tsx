import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  type: "button" | "submit" | "reset";
  text: string;
<<<<<<< HEAD
  children?:string
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button type={type} className={styles["login-button"]} onClick={onClick}>
=======
  
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button type={type} className={styles["login-button"]} >
>>>>>>> main
      {text}
    </button>
  );
};



export default Button;
// src/common/Link.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Link.module.css';

interface LinkProps {
  text: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}


const Link: React.FC<LinkProps> = ({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (text.toLowerCase().includes('sign up')) {
      navigate('/register');
    } else if (text.toLowerCase().includes('forgot password?')) {
      navigate('/forgotpassword');
    }
  };

  return (
    <div className={styles.link} onClick={handleClick}>
      {text}
    </div>
  );
};

export default Link;

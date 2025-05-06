import React from 'react';
import styles from "./FormInput.module.css";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  icon?: React.ReactNode; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder ,icon }) => {
  return (
    <div className={styles["input-field"]}>
      <label>{label}</label>
      <div > 
        <span className={styles.icon}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      
      </div>

    </div>
  );
};

export default InputField;
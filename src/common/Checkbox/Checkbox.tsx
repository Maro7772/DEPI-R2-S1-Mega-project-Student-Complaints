import React from 'react';
import styles from './Checkboxlabel.module.css';

interface CheckboxProps {
  label: string;
  checked: boolean;
  id?:string; // to link the checkbox with the label 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange ,   id = 'checkbox-' + label.replace(/\s+/g, '-').toLowerCase()}) => {
  return (
    <div className={styles["checkbox-container"]}>
      <input 
       id={id} 
        type="checkbox" 
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}  >{label}</label>
    </div>
  );
};

export default Checkbox;
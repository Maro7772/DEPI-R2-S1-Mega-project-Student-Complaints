import React from 'react';
import styles from "./FormInput.module.css";

interface InputFieldProps {
  label: string;
  type: string;
  value?: string;
  icon?: React.ReactNode; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ 
  label, 
  type, 
  value, 
  onChange, 
  onBlur,
  placeholder,
  icon,
  error,
  name,
  ...rest
}, ref) => {
  return (
    <div className={styles["input-field"]}>
      <label>{label}</label>
      <div className={error ? styles["input-error"] : ""}> 
        <span className={styles.icon}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={error ? styles["error-input"] : ""}
          name={name}
          ref={ref}
          {...rest}
        />
      </div>
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
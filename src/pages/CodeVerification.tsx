import Button from '@/common/Button/Buttonsubmit';
import styles from '../common/LoginForm/PasswordStyles.module.css';
import { useNavigate } from 'react-router-dom';

// import React, { useState, useRef, KeyboardEvent } from 'react';

// const CodeVerification: React.FC = () => {
//   const [codes, setCodes] = useState<string[]>(['', '', '', '', '']);
//   const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

//   const handleChange = (index: number, value: string) => {
//     if (/^[0-9]*$/.test(value)) { // Only allow numbers
//       const newCodes = [...codes];
//       newCodes[index] = value;
//       setCodes(newCodes);

//       // Auto-focus next input
//       if (value && index < 4 && inputRefs.current[index + 1]) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' && !codes[index] && index > 0) {
//       // Move focus to previous input on backspace
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const verificationCode = codes.join('');
//     console.log('Verification Code:', verificationCode);
//     // Add your verification logic here
//   };

const CodeVerification = () => {
  const navigate = useNavigate(); 

  const handleSubmit = () => {
 //  API to  email 
 navigate('/ResetPassword'); 
  }
  return (

    <div className={styles.container}>
      
    <div className={styles.formSection}>
  
    <div className={styles.header}>
    <h1 className={styles.title}>Check Your Email</h1>
    <p className={styles.subtitle}>We have sent to the recent email entered <br></br>
      enter the  5 digit code that mentioned in the email</p>

      {/* <div className="code-inputs">
      <form onSubmit={handleSubmit}>
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={code}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="code-input"
              pattern="[0-9]*"
              inputMode="numeric"
              autoFocus={index === 0}
            />
          ))}
          </form>
        </div>
         */}



  </div>
          <Button  type="submit" text={'create an account'} ></Button>

     </div>
</div>     
  );
};

export default CodeVerification;

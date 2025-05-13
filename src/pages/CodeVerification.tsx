import { useState, useRef, KeyboardEvent } from 'react';
import Button from '@/common/Button/Buttonsubmit';
import styles from '../common/LoginForm/PasswordStyles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CodeVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(['', '', '', '', '']); // 5 digit code
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) { // Only allow numbers
      const newCodes = [...code];
      newCodes[index] = value;
      setCode(newCodes);

      // Auto-focus next input
      if (value && index < 4 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };


const handleSubmitCodeverification = async (e: React.FormEvent) => {
  e.preventDefault();

  const verificationCode = code.join('');

  if (verificationCode.length !== 5 || code.includes('')) {
    alert('Please enter the full 5-digit code.');
    return;
  }

  const email = localStorage.getItem('resetEmail');
  
  if (!email) {
    alert("No email found. Please go back and request a reset again.");
    return;
  }

  try {
    const response = await axios.post('/api/auth/verify-code', {
      email,
      code: verificationCode,
    });

    alert(response.data.message || "Code verified successfully");

    localStorage.setItem('verifiedCode', verificationCode);
    navigate('/ResetPassword');

  } catch (error: any) {
    console.error(error);
    const message = error.response?.data?.message || "An error occurred. Please try again.";
    alert(message);
  }
};


  return (
      <div className={styles.container}>
      
    <div className={styles.formSection}>
  
    <div className={styles.header}>
    <h1 className={styles.title}>Check Your Email</h1>
    <p className={styles.subtitle}>We have sent to the recent email entered <br></br>
      enter the  5 digit code that mentioned in the email</p>

        {/* OTP Input Boxes */}
        <form onSubmit={handleSubmitCodeverification}>
          <div className={styles.otpContainer}>

            {code.map((code, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}

                className={styles.otpInput}
                pattern="[0-9]*"
                inputMode="numeric"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <Button
            type="submit"
            text={'Submit'}
          />
        </form>
      </div>

    </div>
    </div>

  );
};

export default CodeVerification;
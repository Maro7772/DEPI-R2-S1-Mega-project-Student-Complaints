import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Button from '@/common/Button/Buttonsubmit';
import styles from '../common/LoginForm/PasswordStyles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from '@/services/axios';

const CodeVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']); // 6-digit code
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      const newCodes = [...code];
      newCodes[index] = value.slice(-1); // Only one digit
      setCode(newCodes);

      // Auto-focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmitCodeverification = async (e: React.FormEvent) => {
    e.preventDefault();

    const verificationCode = code.join('');

    if (verificationCode.length !== 6 || code.includes('')) {
      alert('Please enter the full 6-digit code.');
      return;
    }

    const email = localStorage.getItem('resetEmail');

    if (!email) {
      alert("No email found. Please go back and request a reset again.");
      return;
    }

    try {
      const response = await axios.post('/api/auth/codeVerification', {
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

  // Handle paste full code
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pasteData = e.clipboardData?.getData('Text') || '';
      if (/^\d{6}$/.test(pasteData)) {
        const digits = pasteData.split('');
        setCode(digits);
        inputRefs.current[5]?.focus();
        e.preventDefault();
      }
    };

    const container = document.getElementById('otp-container');
    container?.addEventListener('paste', handlePaste as any);

    return () => {
      container?.removeEventListener('paste', handlePaste as any);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Check Your Email</h1>
          <p className={styles.subtitle}>
            We have sent to the recent email entered <br />
            Enter the 6-digit code mentioned in the email
          </p>

          {/* OTP Input Boxes */}
          <form onSubmit={handleSubmitCodeverification}>
            <div id="otp-container" className={styles.otpContainer}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
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
              text="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CodeVerification;

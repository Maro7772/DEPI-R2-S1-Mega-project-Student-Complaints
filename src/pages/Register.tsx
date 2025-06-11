import { useState } from 'react';
import { FaEnvelope, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../common/LoginForm/LoginForm.module.css';
import FormInput from '@/common/FormInput/FormInput';
import Checkbox from '@/common/Checkbox/Checkbox';
import Button from '@/common/Button/Buttonsubmit';
import Link from '@/common/Link/Link';
import axios from '@/services/axios';
import { setUser } from '@/store/users/userSlice';
import { useDispatch } from 'react-redux';

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Full name validation
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const passwordAsString = password.toString();
      const res = await axios.post('/api/auth/signup', {
        fullName,
        email,
        password: passwordAsString,
        role: userType,
      });

      const { user, accessToken } = res.data;

      if (user && accessToken) {
        dispatch(setUser({
          id: user.id,  
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }));
      }

      localStorage.setItem('token', accessToken);
      navigate('/complaints');

    } catch (error: any) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      setErrors({
        email: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (field: keyof FormErrors) => {
    validateForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registration</h1>
          <p className={styles.subtitle}>Please fill your detail to create your account.</p>
        </div>

        <form onSubmit={handleSubmitRegister}>
          <div className={styles.formGroup}>
            <FormInput
              label='Full Name'
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="John Doe"
              icon={<FaTimesCircle />}
              error={errors.fullName}
            />

            <FormInput
              label='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="youremail@example.com"
              icon={<FaEnvelope />}
              error={errors.email}
            />

            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="*********"
              error={errors.password}
            />

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="*********"
              error={errors.confirmPassword}
            />

            <label htmlFor="userType">Role</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className={styles.selectInput}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <Checkbox
            label="Remember Me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />

          <Button type="submit" text={isSubmitting ? 'Creating account...' : 'Create an account'}></Button>

          <div className={styles.signupText}>
            <p>Have an account?</p> <Link className={styles.signuplink} text={'Login'} onClick={function (): void {
              throw new Error('Function not implemented.');
            }} > </Link>
          </div>
        </form>
      </div>

      <div className={styles.imageSection}>
        <img src="/image.png" alt="Register logo" className={styles.image} />
      </div>
    </div>
  );
}

export default Register;

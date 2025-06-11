import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../common/LoginForm/LoginForm.module.css';
import Button from '@/common/Button/Buttonsubmit';
import Checkbox from '@/common/Checkbox/Checkbox';
import FormInput from '@/common/FormInput/FormInput';
import Link from '@/common/Link/Link';
import axios from '@/services/axios';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/users/userSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email: data.email.trim(),
        password: data.password,
      });

      const { user, accessToken } = response.data;

      // Save token first
      localStorage.setItem('token', accessToken);

      // Then update Redux state
      dispatch(setUser({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }));

      // Navigate to complaints page
      navigate('/complaints', { replace: true });

    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      const errorMessage = error.response?.data?.message || 'Invalid email or password';
      
      setError('email', { 
        type: 'manual',
        message: errorMessage 
      });
      setError('password', { 
        type: 'manual',
        message: errorMessage 
      });
    }
  };

  return (
    <div className={`${styles.container} ${styles.loginPage}`}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <FormInput
              label='Email'
              type="email"
              {...register('email')}
              placeholder="youremail@example.com"
              icon={<FaEnvelope />}
              error={errors.email?.message}
            />

            <FormInput
              label="Password"
              type="password"
              {...register('password')}
              placeholder="*********"
              error={errors.password?.message}
            />

            <div className={styles.options}>
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link  className={styles.signuplink} text="Forgot password?" />
            </div>

            <Button
              type="submit"
              text={isSubmitting ? 'Signing in...' : 'Sign in'}
            />

            <div className={styles.signupText}>
              Don't have an account? <Link className={styles.signuplink} text="Sign up" />
            </div>
          </div>
        </form>
      </div>

      <div className={styles.imageSection}>
        <img src="/image.png" alt="LogIn logo" className={styles.image} />
      </div>
    </div>
  );
}

export default Login;


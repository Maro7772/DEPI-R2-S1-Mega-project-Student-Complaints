import { useState } from 'react';
import { FaEnvelope, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from '../common/LoginForm/LoginForm.module.css';
import FormInput from '@/common/FormInput/FormInput';
import Checkbox from '@/common/Checkbox/Checkbox';
import Button from '@/common/Button/Buttonsubmit';
import Link from '@/common/Link/Link';
import axios from '@/services/axios';
import { setUser } from '@/store/users/userSlice';
import { useDispatch } from 'react-redux';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['student', 'admin']),
  rememberMe: z.boolean().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
      rememberMe: false
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setApiError(''); // Clear any previous errors

    try {
      const res = await axios.post('/api/auth/signup', {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      const { user, accessToken } = res.data;

      if (user && accessToken) {
        if (rememberMe) {
          localStorage.setItem('token', accessToken);
        }
        
        // Save user data
        localStorage.setItem('user', JSON.stringify(user));

        // Update Redux state
        dispatch(setUser({
          id: user.id,  
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }));

        // Navigate to complaints page
        navigate('/complaints', { replace: true });
      }

    } catch (error: any) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      
      // Handle specific API errors
      if (error.response?.data?.message) {
        if (error.response.data.message.includes('already exists')) {
          setApiError('This email is already registered. Please log in instead.');
        } else {
          setApiError(error.response.data.message);
        }
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.container} ${styles.registerPage}`}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registration</h1>
          <p className={styles.subtitle}>Please fill your detail to create your account.</p>
        </div>

        {apiError && (
          <div className={styles.errorMessage}>
            {apiError}
            {apiError.includes('already exists') && (
              <div className={styles.loginLink}>
                <Link 
                  className={styles.signuplink} 
                  text="Click here to login" 
                  onClick={() => navigate('/login')}
                />
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <FormInput
              label='Full Name'
              type="text"
              {...register('fullName')}
              placeholder="John Doe"
              icon={<FaTimesCircle />}
              error={errors.fullName?.message}
            />

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

            <FormInput
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              placeholder="*********"
              error={errors.confirmPassword?.message}
            />

            <label htmlFor="userType">Role</label>
            <select
              id="userType"
              {...register('role')}
              className={styles.selectInput}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className={styles.options}>
            <Checkbox
              label="Remember Me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>

          <Button type="submit" text={isSubmitting ? 'Creating account...' : 'Create an account'}></Button>

          <div className={styles.signupText}>
            Have an account? <Link className={styles.signuplink} text={'Login'} onClick={() => navigate('/login')} />
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

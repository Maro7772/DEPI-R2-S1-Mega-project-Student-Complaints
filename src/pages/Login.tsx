<<<<<<< HEAD
import LoginForm from '@/common/LoginForm/LoginForm';

function Login() {
  return (
    <div className="app">
      <LoginForm />
=======
import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../common/LoginForm/LoginForm.module.css';
import Button from '@/common/Button/Buttonsubmit';
import Checkbox from '@/common/Checkbox/Checkbox';
import FormInput from '@/common/FormInput/FormInput';
import Link from '@/common/Link/Link';
import axios from '@/services/axios';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/users/userSlice';



function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmitlogin = async (e: { preventDefault: () => void; }) => {

    e.preventDefault();

    try {
      const passwordAsString = password.toString();
      const response = await axios.post('/api/auth/login', {
        email,
        password: passwordAsString,
      });

      console.log('Login successful:', response.data);

      const { user, accessToken } = response.data;
      // Save user in redux
      dispatch(setUser({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      }));

      // Save token
      localStorage.setItem('token', accessToken);

      // To navigate 
      navigate('/complaints');

    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }

  };




  return (
    <div className={styles.container}>

      <div className={styles.formSection}>

        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Please fill your detail to access your account.</p>
        </div>


        {/* *****************   form on submit   ********************* */}
        <form onSubmit={handleSubmitlogin}>
          <div className={styles.formGroup}>

            <FormInput
              label='Email'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              icon={<FaEnvelope />}
            />

            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
            />
          </div>
          <div className={styles.options}>
            <Checkbox
              label="Remember Me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <Link text={'Forgot Password?'} onClick={function (): void {
              throw new Error('Function not implemented.');
            }} ></Link>
          </div>

          <Button type="submit" text={'Sign in'} ></Button>

          <div className={styles.signupText}>
            <p>Don't have an account ?</p> <Link className={styles.signuplink} text={'Sign up'} onClick={function (): void {
              throw new Error('Function not implemented.');
            }} >  </Link>
          </div>
        </form>
      </div>

      <div className={styles.imageSection}>
        <img src="/image.png" alt="LogIn logo" className={styles.image} />
      </div>

>>>>>>> main
    </div>
  );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;

>>>>>>> main

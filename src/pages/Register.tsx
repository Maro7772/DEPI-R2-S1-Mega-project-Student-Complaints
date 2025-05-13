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



function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmitRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Validation to check if password and confirm password match
    if (password !== confirmpassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const passwordAsString = password.toString();
      // Send the registration request to the backend
      const res = await axios.post('/api/auth/signup', {
        fullName: text,
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
      console.error('Registration failed');

    };

  }
  return (
    <div className={styles.container}>

      <div className={styles.formSection}>

        <div className={styles.header}>
          <h1 className={styles.title}>Registeration</h1>
          <p className={styles.subtitle}>Please fill your detail to create your account.</p>
        </div>


        {/* *****************   form on submit   ********************* */}
        <form onSubmit={handleSubmitRegister}>
          <div className={styles.formGroup}>

            <FormInput
              label='fullName'
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Omaryassereldeeb"
              icon={<FaTimesCircle />}
            />

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

            <FormInput
              label="Confirm Password"
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*********"
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
          <div className={styles.options}>
            <Checkbox
              label="Remember Me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>

          <Button type="submit" text={'create an account'}></Button>

          <div className={styles.signupText}>
            <p> Have an account ?</p> <Link className={styles.signuplink} text={'login'}> </Link>
          </div>
        </form>
      </div>

      <div className={styles.imageSection}>
        <img src="/image.png" alt="LogIn logo" className={styles.image} />
      </div>

    </div>
  );
}


export default Register;

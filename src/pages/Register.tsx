import { useState } from 'react';
import { FaEnvelope, FaTimesCircle } from 'react-icons/fa'; 

import styles from '../common/LoginForm/LoginForm.module.css';
import FormInput from '@/common/FormInput/FormInput';
import Checkbox from '@/common/Checkbox/Checkbox';
import Button from '@/common/Button/Buttonsubmit';
import Link from '@/common/Link/Link';

const Register = () => {
  const [text , setText]  =useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember:', rememberMe);
  };

  return (
    <div className={styles.container}>
      
    <div className={styles.formSection}>
  
      <div className={styles.header}>
        <h1 className={styles.title}>Registeration</h1>
        <p className={styles.subtitle}>Please fill your detail to create your account.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>

        <FormInput
          label='Username'
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
      </div>
        <div className={styles.options}>
          <Checkbox 
            label="Remember Me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
        </div>

        <Button  type="submit" text={'create an account'} onClick={function (): void {
          throw new Error('Function not implemented.');
        } }></Button>

        <div className={styles.signupText}>
          <p> Have an account ?</p> <Link className={styles.signuplink}  text={'login'} onClick={function (): void {
            throw new Error('Function not implemented.');
          } } >  </Link>
        </div>
      </form>  
        </div>

        <div className={styles.imageSection}>
        <img src="/image.png" alt="LogIn logo" className={styles.image} />
      </div>
  
    </div>
  );
}

export default Register

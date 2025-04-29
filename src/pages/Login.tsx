import { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa'; 

import styles from '../common/LoginForm/LoginForm.module.css';
import Button from '@/common/Button/Buttonsubmit';
import Checkbox from '@/common/Checkbox/Checkbox';
import FormInput from '@/common/FormInput/FormInput';
import Link from '@/common/Link/Link';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember:', rememberMe);
    
  };

  return (
    <div className={styles.container}>

    <div className={styles.formSection}>

      <div className={styles.header}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Please fill your detail to access your account.</p>
      </div>

      <form onSubmit={handleSubmit}>
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
          } } ></Link>
        </div>

        <Button  type="submit" text={'Sign in'} onClick={function (): void {
          throw new Error('Function not implemented.');
        } }></Button>

        <div className={styles.signupText}>
          <p>Don't have an account ?</p> <Link className={styles.signuplink}  text={'Sign up'} onClick={function (): void {
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

export default Login;


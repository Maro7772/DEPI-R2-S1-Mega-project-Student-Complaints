import FormInput from '@/common/FormInput/FormInput'
import Link from '@/common/Link/Link';
import styles from '../common/LoginForm/PasswordStyles.module.css';
import Button from '@/common/Button/Buttonsubmit';
import  { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {
   const [email, setEmail] = useState('');
   const navigate = useNavigate(); 

   const handleSubmit = () => {
  //  API to  email 
  navigate('/CodeVerification'); 
};
  return (
    <div className={styles.container}>
  <div className={styles.formSection}>
<div className={styles.header}>
        <h1 className={styles.title}>Forget Password</h1>
        <p className={styles.subtitle}>Please enter your email.</p>
      </div>
      <div className={styles.formGroup}>
      <FormInput
          label='Email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          icon={<FaEnvelope />}
          />
   </div>
      <Button type="submit" text={'ٌRest Password'} onClick={handleSubmit}></Button>
        <div className={styles.signupText}>
          <p>Don't have an account ?</p> <Link className={styles.signuplink}  text={'Sign up'} onClick={function (): void {
            throw new Error('Function not implemented.');
          } } >  </Link>
        </div>
    </div>
    </div>
  )
}

export default ForgetPassword

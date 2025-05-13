import FormInput from '@/common/FormInput/FormInput'
import Link from '@/common/Link/Link';
import styles from '../common/LoginForm/PasswordStyles.module.css';
import Button from '@/common/Button/Buttonsubmit';
import { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from '@/services/axios';



const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmitForgetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });

      console.log('Email sent successfully:', response.data.message);
      
   
      localStorage.setItem('resetEmail', email);
      
      navigate('/CodeVerification'); 
    } catch (error: any) {
      console.error('Error sending reset email:', error.response?.data?.message || error.message);
      alert('Something went wrong. Please try again.');
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Forget Password</h1>
          <p className={styles.subtitle}>Please enter your email.</p>
        </div>

        <form onSubmit={handleSubmitForgetPassword}>
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
        <Button type="submit" text={'ٌRest Password'}></Button>
        <div className={styles.signupText}>
          <p>Don't have an account ?</p> <Link className={styles.signuplink} text={'Sign up'} >  </Link>
        </div>
         </form>
      </div>
    </div>
  )
}

export default ForgetPassword

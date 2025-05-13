import FormInput from '@/common/FormInput/FormInput'
import styles from '../common/LoginForm/PasswordStyles.module.css';
import Button from '@/common/Button/Buttonsubmit';
import  { useState } from 'react'



const ResetPassword = () => {
    const [newpassword, setNewPassword] = useState('');
    const [confirmnewpassword, setConfirmNewPassword] = useState('');

  return (
    <div className={styles.container}>
  <div className={styles.formSection}>
<div className={styles.header}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>Please fill your new password..</p>
      </div>
      <div className={styles.formGroup}>
      <FormInput  
          label="New Password"
          type="password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="*********"
        />

         <FormInput
           label="Confirm New Password"
           type="password"
            value={confirmnewpassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="*********"
            />
   </div>
      <Button type="submit" text={'Update Password'} ></Button>
        </div>
    </div>
  )
}

export default ResetPassword

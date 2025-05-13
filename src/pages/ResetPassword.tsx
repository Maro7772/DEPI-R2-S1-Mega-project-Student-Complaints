import FormInput from '@/common/FormInput/FormInput'
import styles from '../common/LoginForm/PasswordStyles.module.css';
import Button from '@/common/Button/Buttonsubmit';
import { useState } from 'react'
import axios from '@/services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/users/userSlice';




const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmNewPassword] = useState('');



  const handleSubmitResetpassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = localStorage.getItem('resetEmail');
    const code = localStorage.getItem('verifiedCode');

    if (!email || !code) {
      alert('Reset session expired. Please try again.');
      return;
    }

    if (!newpassword || !confirmnewpassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (newpassword !== confirmnewpassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('/api/auth/reset-password', {
        email,
        code,
        password: newpassword,
      });

      if (res.status === 200) {
        alert('Password reset successful!');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetCode');


        const { user, accessToken } = res.data;

        // Save user in redux
        dispatch(setUser({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        }));

        // Save token
        localStorage.setItem('token', accessToken);
        navigate('/complaints');
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };



  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Please fill your new password..</p>
        </div>

        <form onSubmit={handleSubmitResetpassword}>
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

        </form>
      </div>
    </div>
  )
}

export default ResetPassword

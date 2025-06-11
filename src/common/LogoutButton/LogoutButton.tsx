import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/users/userSlice';
import axios from '@/services/axios';
import LogoutDialog from '@/common/LogoutDialog/LogoutDialog';
import styles from './LogoutButton.module.css';

const LogoutButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError(null);
    
    try {
      // First clear local state
      localStorage.removeItem('token');
      dispatch(logoutUser());
      
      // Then try to call the logout endpoint
      await axios.post('api/auth/logout', null, { withCredentials: true });
      
      // Navigate to login page
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Logout failed:', error);
      setError(error.response?.data?.message || 'Failed to logout. Please try again.');
      
      // If the server is unreachable, we should still log the user out locally
      if (!error.response) {
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoggingOut(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <button 
        className={styles.logoutButton}
        onClick={() => setIsDialogOpen(true)}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>

      <LogoutDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setError(null);
        }}
        onConfirm={handleLogout}
        error={error}
      />
    </>
  );
};

export default LogoutButton; 
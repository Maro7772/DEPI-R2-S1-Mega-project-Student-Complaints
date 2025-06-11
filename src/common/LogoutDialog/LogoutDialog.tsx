import React from 'react';
import styles from './LogoutDialog.module.css';
import Button from '@/common/Button/Buttonsubmit';

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error?: string | null;
}

const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onClose, onConfirm, error }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Confirm Logout</h2>
        <p className={styles.message}>Are you sure you want to logout?</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttons}>
          <button 
            className={styles.cancelButton} 
            onClick={onClose}
          >
            Cancel
          </button>
          <Button 
            type="button" 
            text="Logout" 
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog; 
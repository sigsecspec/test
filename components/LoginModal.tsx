import React from 'react';
import LoginScreen from './LoginScreen';
import { XIcon } from './Icons';
import { User } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onLogin: (email: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, users, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <LoginScreen users={users} onLogin={onLogin} />
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close login modal"
        >
          <XIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;

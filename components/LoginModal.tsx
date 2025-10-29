import React from 'react';
import { User, UserRole } from '../types';
import * as Icons from './Icons';

interface LoginModalProps {
    users: User[];
    onLogin: (email: string) => void;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ users, onLogin, onClose }) => {
    const sortedUsers = [...users].sort((a, b) => {
        const order = Object.values(UserRole);
        return order.indexOf(a.role) - order.indexOf(b.role);
    });

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <div className="w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-2xl p-6">
                    <div className="text-center mb-6">
                        <Icons.Shield className='w-12 h-12 mx-auto text-[var(--accent-primary)] mb-2' />
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">SSS Portal</h1>
                        <p className="text-[var(--text-secondary)] mt-1">Select a profile to log in</p>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                        {sortedUsers.map(user => (
                            <button key={user.id} onClick={() => onLogin(user.email)} className="w-full flex items-center text-left bg-[var(--bg-primary)] hover:bg-[var(--border-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] p-3 rounded-md transition-all duration-150 transform hover:border-[var(--border-primary-hover)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                    <Icons.User className='w-5 h-5 text-[var(--accent-primary)]' />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-sm">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{user.role}</p>
                                </div>
                                <div className="ml-auto text-right flex-shrink-0">
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">Lvl {user.level}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <Icons.X className='w-8 h-8' />
                </button>
            </div>
        </div>
    );
};

export default LoginModal;

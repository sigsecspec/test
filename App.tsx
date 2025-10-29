import React, { useState, useEffect, useCallback } from 'react';
import * as db from './database';
// FIX: Add UserRole to imports.
import { User, UserRole } from './types';
import HomePage from './components/HomePage';
import DashboardScreen from './components/DashboardScreen';
import LoginModal from './components/LoginModal';
import ApplicationModal from './components/ApplicationModal';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isApplicationModalOpen, setApplicationModalOpen] = useState(false);
    const [applicationType, setApplicationType] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = useCallback(() => {
        // FIX: The getUsers function expects an array of roles. Pass all roles to get all users.
        setUsers(db.getUsers(Object.values(UserRole)));
        // If a user is logged in, refresh their data too
        if (currentUser) {
            const refreshedUser = db.getUserById(currentUser.id);
            if (refreshedUser) {
                setCurrentUser(refreshedUser);
            } else {
                // User was deleted, log them out
                setCurrentUser(null);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        setIsLoading(true);
        refreshData();
        setIsLoading(false);

        const handleStorageChange = () => {
            console.log('Database updated, refreshing data.');
            refreshData();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [refreshData]);


    const handleLogin = (email: string) => {
        const user = db.getUserByEmail(email);
        if (user) {
            setCurrentUser(user);
            setLoginModalOpen(false);
        } else {
            alert('User not found.');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    const openApplicationModal = (type: string) => {
        setApplicationType(type);
        setApplicationModalOpen(true);
    };
    const closeApplicationModal = () => setApplicationModalOpen(false);
    
    const handleApplicationSubmit = (appData: { type: string; data: any; }) => {
        db.addApplication(appData);
        alert('Application submitted successfully! It will be reviewed by operations.');
        closeApplicationModal();
    };

    if (isLoading) {
        return <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)]">Loading System...</div>;
    }

    return (
        <>
            {currentUser ? (
                <DashboardScreen currentUser={currentUser} onLogout={handleLogout} />
            ) : (
                <HomePage onLoginClick={openLoginModal} onApplyClick={openApplicationModal} />
            )}

            {isLoginModalOpen && (
                <LoginModal
                    users={users}
                    onLogin={handleLogin}
                    onClose={closeLoginModal}
                />
            )}

            {isApplicationModalOpen && applicationType && (
                <ApplicationModal
                    type={applicationType}
                    onClose={closeApplicationModal}
                    onSubmit={handleApplicationSubmit}
                />
            )}
        </>
    );
};

export default App;

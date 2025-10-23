import React, { useState } from 'react';
import { UserRole } from './types';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import { TEST_USERS } from './constants';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (email: string, pass: string): boolean => {
    const user = TEST_USERS[email.toLowerCase()];
    if (user && user.password === pass) {
      setUserRole(user.role);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#c4c4c4] font-sans">
      {userRole ? (
        <DashboardScreen userRole={userRole} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { User } from './types';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import { getUserByEmail, initializeDB } from './database';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    initializeDB();
  }, []);

  const handleLogin = (email: string) => {
    const user = getUserByEmail(email);
    if (user) {
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#c4c4c4] font-sans">
      {currentUser ? (
        <DashboardScreen user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
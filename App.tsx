import React, { useState, useEffect } from 'react';
import { User, Mission, Client, UserRole } from './types';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import { 
  getUserByEmail, 
  initializeDB, 
  getUsers, 
  getMissions, 
  getClients, 
  claimMission as dbClaimMission,
  addMission as dbAddMission,
} from './database';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load all data from the database into state
  const loadData = () => {
    setUsers(getUsers());
    setMissions(getMissions());
    setClients(getClients());
  };

  useEffect(() => {
    initializeDB();
    loadData();
    setIsLoading(false);

    // Listen for storage changes to sync across tabs
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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

  const handleClaimMission = (missionId: string, guardId: string) => {
    const updatedMission = dbClaimMission(missionId, guardId);
    if (updatedMission) {
      // Update the mission in our local state to trigger a re-render
      setMissions(prevMissions => 
        prevMissions.map(m => m.id === missionId ? updatedMission : m)
      );
    }
  };

  const handleAddMission = (missionData: Omit<Mission, 'id' | 'status' | 'claimedBy'>) => {
    const newMission = dbAddMission(missionData);
    // Add the new mission to our local state
    setMissions(prevMissions => [...prevMissions, newMission].sort((a, b) => a.startTime.getTime() - b.startTime.getTime()));
  };
  
  if (isLoading) {
    return <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c4c4c4]">Loading System...</div>
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#c4c4c4] font-sans">
      {currentUser ? (
        <DashboardScreen 
          user={currentUser} 
          users={users}
          missions={missions}
          clients={clients}
          onLogout={handleLogout}
          onClaimMission={handleClaimMission}
          onAddMission={handleAddMission}
        />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
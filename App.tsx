import React, { useState, useEffect } from 'react';
import { User, Mission, Client } from './types';
import DashboardScreen from './components/DashboardScreen';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import { 
  initializeDB, 
  getUserByEmail, 
  getUsers, 
  getMissions, 
  getClients, 
  getSites,
  getAlerts,
  getApplications,
  getApprovals,
  claimMission as dbClaimMission,
  addMission as dbAddMission,
} from './database';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Function to load all data from the database into state
  const loadData = () => {
    setUsers(getUsers());
    setMissions(getMissions());
    setClients(getClients());
    setSites(getSites());
    setAlerts(getAlerts());
    setApplications(getApplications());
    setApprovals(getApprovals());
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
      setLoginModalOpen(false); // Close modal on successful login
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {currentUser ? (
        <DashboardScreen 
          user={currentUser} 
          users={users}
          missions={missions}
          clients={clients}
          sites={sites}
          alerts={alerts}
          applications={applications}
          approvals={approvals}
          onLogout={handleLogout}
          onClaimMission={handleClaimMission}
          onAddMission={handleAddMission}
        />
      ) : (
        <>
            <HomePage onOpenLoginModal={() => setLoginModalOpen(true)} />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
                users={users} 
                onLogin={handleLogin}
            />
        </>
      )}
    </div>
  );
};

export default App;